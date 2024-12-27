use strict;
use warnings;
use feature 'say';

use List::Util qw(sum);

open(my $fh, '<', 'inputs/day-11.txt') or die "Cannot open input file: $!";
my $input = do { local $/; <$fh> };
close($fh);

say 'Part 1: ' . solve($input, 25);
say 'Part 2: ' . solve($input, 75);

sub solve {
    my ($input, $number_of_blinks) = @_;

    my $numbers = {};
    $numbers->{$_} = 1 for split(/ /, $input);

    for my $i (1 .. $number_of_blinks) {
        $numbers = handle_blink($numbers);
    }

    return sum(values %$numbers);
}

sub handle_blink {
    my ($numbers) = @_;
    my %new_numbers;

    foreach my $number (keys %$numbers) {
        if ($number == 0) {
            $new_numbers{1} += $numbers->{0};
        }
        elsif (length($number) % 2 == 0) { # if length of number is even, split it
            foreach my $half (split_digits_in_half($number)) {
                $new_numbers{$half} += $numbers->{$number};
            }
        }
        else {
            $new_numbers{$number * 2024} += $numbers->{$number};
        }
    }

    return \%new_numbers;
}

# Splits digits in half, and returns them as two numbers with trailing zeroes removed
sub split_digits_in_half {
    my ($digits) = @_;

    my $halfway_point = length($digits) / 2;
    # Add to zero to convert to a number, which removes trailing zeroes
    my $first_half    = 0 + substr($digits, 0, $halfway_point);
    my $second_half   = 0 + substr($digits, $halfway_point);

    return ($first_half, $second_half);
}
