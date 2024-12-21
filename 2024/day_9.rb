def part1(input)
  blocks, free_space_indexes = parse_blocks(input)
  blocks = move_file_blocks_left(blocks, free_space_indexes)
  calculate_checksum(blocks)
end

def part2(input)
  blocks, free_space_indexes = parse_blocks(input)
  blocks = move_whole_files_left(blocks, free_space_indexes)
  calculate_checksum(blocks)
end

def calculate_checksum(blocks)
  checksum = 0

  blocks.each_with_index do |block, i|
    next if block == '.'

    checksum += (i * block)
  end

  checksum
end

def move_file_blocks_left(blocks, free_space_indexes)
  (blocks.length - 1).downto(0).each do |i|
    break if i < free_space_indexes[0]
    next if blocks[i] == '.'

    blocks[free_space_indexes.shift] = blocks[i]
    blocks[i] = '.'
  end

  blocks
end

def move_whole_files_left(blocks, free_space_indexes)
  # Files are consecutive, equal numbers in blocks, so split blocks into arrays of whole files
  whole_files = consecutive_equal_chunks(blocks)
  # Split free_space_indexes into arrays of contiguous indexes
  free_space_chunks = consecutive_incrementing_chunks(free_space_indexes)

  # Keep track of where we are while moving backwards through blocks
  current_blocks_index = blocks.length - 1

  whole_files.reverse.each do |whole_file|
    break if current_blocks_index < free_space_indexes[0]

    current_blocks_index = move_file_into_free_space(
      whole_file,
      free_space_chunks,
      blocks,
      current_blocks_index,
    )
  end

  blocks
end

# Splits an array into chunks of consecutive, equal elements
def consecutive_equal_chunks(array)
  array.chunk_while { |i, j| i == j }.to_a
end

# Split an array into chunks of consecutive elements that increase by one each time
def consecutive_incrementing_chunks(array)
  array.chunk_while { |i, j| j == i + 1 }.to_a
end

def move_file_into_free_space(file, free_space_chunks, blocks, current_blocks_index)
  moved_file = false

  unless file[0] == '.'
    # Check all the free spaces to see if there's a chunk big enough to fit the current file in
    free_space_chunks.each do |free_space_chunk|
      next if free_space_chunk.empty?
      # Skip if the amount of free space isn't big enough for the file
      next if free_space_chunk.length < file.length
      # Stop iterating if we've gone past the file we want to insert; files can only be moved left,
      # so in this case the file is left where it is
      break if free_space_chunk[0] >= current_blocks_index

      insert_indexes = free_space_chunk[0..file.length - 1]
      current_blocks_index = insert_and_update_state(
        insert_indexes,
        file,
        free_space_chunk,
        blocks,
        current_blocks_index
      )

      moved_file = true
      break # end the loop once we've inserted
    end
  end

  # When we move a file, we're already decremementing current_blocks_index, so we only need to
  # decrease it here if we failed to insert the file anywhere
  current_blocks_index -= file.length unless moved_file

  current_blocks_index
end

def insert_and_update_state(insert_indexes, file, free_space_chunk, blocks, current_blocks_index)
  insert_indexes.each_with_index do |insert_index, i|
    free_space_chunk.delete_at(0)
    blocks[insert_index] = file[i]
    blocks[current_blocks_index] = '.'
    current_blocks_index -= 1
  end

  current_blocks_index
end

def parse_blocks(input)
  blocks = []
  free_space_indexes = []

  current_id = 0

  input.each_char.each_with_index do |block_length, i|
    is_file_block = i.even?
    block_length = block_length.to_i

    block_length.times do
      if is_file_block
        blocks.push(current_id)
      else
        free_space_indexes.push(blocks.length)
        blocks.push('.')
      end
    end

    current_id += 1 if is_file_block
  end

  [blocks, free_space_indexes]
end

input = File.read('inputs/day-9.txt')
puts "Part 1: #{part1(input)}"
puts "Part 2: #{part2(input)}"
