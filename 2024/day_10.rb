DIRECTIONS = [
  [-1, 0], # up
  [1, 0],  # down
  [0, -1], # left
  [0, 1],  # right
].freeze

def parse_grid(input)
  input.lines.map { |line| line.chomp.chars.map(&:to_i) }
end

def calculate_combined_trailhead(grid, type = :score)
  total = 0

  grid.each_with_index do |row, row_number|
    row.each_with_index do |col, col_number|
      next unless col.zero?

      visited_nine_positions = type == :score ? {} : nil
      total += calculate_trailhead(grid, 0, row_number, col_number, visited_nine_positions)
    end
  end

  total
end

def calculate_trailhead(grid, current_value, current_row, current_col, visited_nine_positions = nil)
  current_number = grid[current_row][current_col]

  find_valid_neighbours(grid, current_row, current_col).sum do |next_row, next_col|
    next_number = grid[next_row][next_col]

    if current_number == 8 && next_number == 9
      handle_nine_found(current_value, visited_nine_positions, next_row, next_col)
    elsif next_number == current_number + 1
      calculate_trailhead(grid, current_value, next_row, next_col, visited_nine_positions)
    else
      0
    end
  end
end

def handle_nine_found(current_value, visited_nine_positions, next_row, next_col)
  if visited_nine_positions
    position_key = "#{next_row},#{next_col}"
    return 0 if visited_nine_positions[position_key]

    visited_nine_positions[position_key] = true
  end

  current_value + 1
end

def find_valid_neighbours(grid, current_row, current_col)
  DIRECTIONS.filter_map do |row_delta, col_delta|
    next_row = current_row + row_delta
    next_col = current_col + col_delta
    [next_row, next_col] unless out_of_bounds(grid, next_row, next_col)
  end
end

def out_of_bounds(grid, row, col)
  row < 0 || row >= grid.length || col < 0 || col >= grid[0].length
end

# Debug method for printing the current state of the grid
def print_grid(grid, current_row, current_col)
  grid.each_with_index do |row, row_number|
    row.each_with_index do |col, col_number|
      print(row_number == current_row && col_number == current_col ? "[#{col}]" : " #{col} ")
    end
    puts ''
  end
  puts ''
end

grid = parse_grid(File.read('inputs/day-10.txt'))
puts "Part 1: #{calculate_combined_trailhead(grid, :score)}"
puts "Part 2: #{calculate_combined_trailhead(grid, :rating)}"
