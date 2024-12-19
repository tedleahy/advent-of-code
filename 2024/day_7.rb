def solve(operators)
  total_calibration_result = 0

  File.foreach('inputs/day-7.txt').each do |line|
    solution, numbers = parse_line(line)

    operators.each do |operator|
      if valid_combination_exists?(solution, numbers[1..], numbers[0], operators, operator)
        total_calibration_result += solution
        break
      end
    end
  end

  total_calibration_result
end

def parse_line(line)
  parsed = line.split(' ')
  solution = parsed[0][0..-2].to_i # remove trailing colon
  numbers = parsed[1..].map(&:to_i)

  [solution, numbers]
end

def valid_combination_exists?(solution, numbers, result, operators, current_operator)
  return result == solution if numbers.empty?

  result = do_operation(result, numbers[0], current_operator)

  return false if result > solution

  operators.each do |next_operator|
    if valid_combination_exists?(solution, numbers[1..], result, operators, next_operator)
      return true
    end
  end

  false
end

def do_operation(left_operand, right_operand, operator)
  case operator
  when '+'
    left_operand + right_operand
  when '*'
    left_operand * right_operand
  when '||'
    (left_operand.to_s + right_operand.to_s).to_i
  end
end

puts "Part 1: #{solve(%w[+ *])}"
puts "Part 2: #{solve(%w[+ * ||])}"
