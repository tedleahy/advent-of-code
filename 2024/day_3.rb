MUTLIPLY_PATTERN = /mul\( (\d+),(\d+) \)/x.freeze
DO_PATTERN = /do\(\)/.freeze
DONT_PATTERN = /don't\(\)/.freeze
# Match mul() instructions again, this time without capturing the numbers inside them
INSTRUCTION_PATTERN = Regexp.union(/mul\(\d+,\d+\)/, DO_PATTERN, DONT_PATTERN)

def part1(input)
  input.scan(MUTLIPLY_PATTERN).sum { |x, y| x.to_i * y.to_i }
end

def part2(input)
  multiplication_enabled = true
  total = 0

  input.scan(INSTRUCTION_PATTERN) do |instruction|
    case instruction
    when DO_PATTERN
      multiplication_enabled = true
    when DONT_PATTERN
      multiplication_enabled = false
    else
      if multiplication_enabled
        x, y = instruction.match(MUTLIPLY_PATTERN).captures
        total += (x.to_i * y.to_i)
      end
    end
  end

  total
end

input = File.read('inputs/day-3.txt')
puts "Part 1: #{part1(input)}"
puts "Part 2: #{part2(input)}"
