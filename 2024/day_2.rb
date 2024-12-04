def solve(problem_dampener_enabled)
  safe_reports_count = 0

  File.foreach('inputs/day-2.txt').each do |report|
    report = report.strip.split(' ').map(&:to_i)
    safe_reports_count += 1 if report_is_safe?(report, problem_dampener_enabled)
  end

  safe_reports_count
end

def report_is_safe?(report, problem_dampener_enabled)
  is_increasing = report[0] < report[1]

  (0..report.length - 2).each do |i|
    level = report[i]
    next_level = report[i + 1]

    unless levels_pair_is_safe?(level, next_level, is_increasing)
      return problem_dampener_enabled ? remove_levels_and_retry(report) : false
    end
  end

  true
end

def levels_pair_is_safe?(level, next_level, is_increasing)
  return false if is_increasing && level > next_level
  return false if !is_increasing && level < next_level

  difference = (level - next_level).abs

  difference >= 1 && difference <= 3
end

def remove_levels_and_retry(report)
  temp_report = report.dup
  report.length.times do |i|
    removed_level = temp_report.delete_at(i)
    return true if report_is_safe?(temp_report, false)

    temp_report.insert(i, removed_level) # add element back in for next iteration
  end

  false
end

puts "Part 1: #{solve(false)}"
puts "Part 2: #{solve(true)}"
