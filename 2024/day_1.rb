$left_list = []
$right_list = []

File.foreach('inputs/day-1.txt').each do |line|
  left, right = line.split
  $left_list << left.to_i
  $right_list << right.to_i
end

$left_list.sort!
$right_list.sort!

def part1
  total_distance = 0

  $left_list.each_with_index do |left, index|
    right = $right_list[index]
    total_distance += [left, right].max - [left, right].min
  end

  total_distance
end

def part2
  total_similarity = 0
  right_counts = $right_list.tally

  $left_list.each do |left|
    total_similarity += left * right_counts.fetch(left, 0)
  end

  total_similarity
end

puts "Part 1: #{part1}"
puts "Part 2: #{part2}"
