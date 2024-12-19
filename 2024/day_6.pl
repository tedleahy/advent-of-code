use strict;
use warnings;
use feature 'say';

use Time::HiRes qw(time);

my %MOVEMENTS = (
    up    => [-1, 0],
    down  => [1, 0],
    left  => [0, -1],
    right => [0, 1],
);

my %NEXT_DIRECTIONS = (
    up    => 'right',
    right => 'down',
    down  => 'left',
    left  => 'up',
);

open(my $fh, '<', 'inputs/day-6.txt') or die "Cannot open input file: $!";
my $input = do { local $/; <$fh> };
close($fh);

my $START_DIRECTION = 'up';
my ($grid, $start_position) = build_grid($input);
my $rows = scalar @$grid - 1;
my $cols = scalar @{$grid->[0]} - 1;

my %part_1_visited_positions = part_1();
say 'Part 1: ' . scalar (keys %part_1_visited_positions);

my $part2_start = time();
say 'Part 2: ' . part_2(%part_1_visited_positions);
my $part2_end = time();
printf "Part 2 duration: %f seconds\n", $part2_end - $part2_start;

sub part_1 {
    my $current_position  = $start_position;
    my $current_direction = $START_DIRECTION;
    my %visited_positions = ( join(',', @$start_position) => 1 );

    while (within_bounds($current_position)) {
        my ($next_row, $next_col) = move_guard($current_position, $current_direction);
        last unless within_bounds([$next_row, $next_col]);

        my $hit_obstruction = $grid->[$next_row][$next_col] eq '#';
        if ($hit_obstruction) {
            $current_direction = $NEXT_DIRECTIONS{$current_direction};
        }
        else {
            $current_position = [$next_row, $next_col];
            $visited_positions{"$next_row,$next_col"} = 1;
        }
    }

    return %visited_positions;
}

sub part_2 {
    my (%part_1_visited_positions) = @_;
    my $guard_loop_count = 0;

    foreach my $obstruction_position (keys %part_1_visited_positions) {
        my ($obstruction_row, $obstruction_col) = split /,/, $obstruction_position;

        # Reset the guard's position and direction at the start of each loop
        my $current_position  = $start_position;
        my $current_direction = $START_DIRECTION;
        my %visited_states = (
            join(',', @$current_position, $current_direction) => 1,
        );

        while (1) {
            my ($next_row, $next_col) = move_guard($current_position, $current_direction);

            # End loop if guard has gone out of the bounds of the grid
            last unless within_bounds([$next_row, $next_col]);

            my $guard_state = "$next_row,$next_col,$current_direction";
            if ($visited_states{$guard_state}) {
                $guard_loop_count++;
                last;
            }

            # Check whether we've hit either an existing obstruction or the new one we're adding in
            my $hit_obstruction = $grid->[$next_row][$next_col] eq '#' ||
                ($next_row == $obstruction_row && $next_col == $obstruction_col);
            
            if ($hit_obstruction) {
                $current_direction = $NEXT_DIRECTIONS{$current_direction};
            }
            else {
                $current_position = [$next_row, $next_col];
            }

            $visited_states{$guard_state}++;
        } 
    }

    return $guard_loop_count;
}

# Move the guard in the right direction and return their new position
sub move_guard {
    my ($current_position, $current_direction) = @_;
    my ($row, $col) = @$current_position;
    my ($row_delta, $col_delta) = @{$MOVEMENTS{$current_direction}};

    return $row + $row_delta, $col + $col_delta;
}

# Returns whether a position is within the bounds of the grid
sub within_bounds {
    my ($position) = @_;
    my ($row, $col) = @$position;

    return $row >= 0 && $row <=$rows && $col >= 0 && $col <= $cols;
}

# Build initial grid and return it along with the guard's start position
sub build_grid {
    my ($input) = @_;
    my $grid           = [];
    my $start_position = [];

    my @rows = split /\n/, $input;
    foreach my $row_number (0 .. $#rows) {
        my $row = $rows[$row_number];

        foreach my $col_number (0 .. length($row) - 1) {
            my $letter = substr($row, $col_number, 1);
            push @{$grid->[$row_number]}, $letter;
            $start_position = [$row_number, $col_number] if $letter eq '^';
        }
    }

    return $grid, $start_position;
}

# For debugging: print the current grid state
sub print_grid {
    my ($current_position, $current_direction, $obstruction_position) = @_;

    my %direction_symbols = (
        up    => '^',
        down  => 'v',
        left  => '<',
        right => '>',
    );

    say '  0123456789';

    foreach my $row_number (0 .. $#$grid) {
        my $row = $grid->[$row_number];

        print "$row_number ";
        foreach my $col_number (0 .. $#$row) {
            my $col = $row->[$col_number];

            if (positions_are_equal([$row_number, $col_number], $current_position)) {
                print $direction_symbols{$current_direction}
            }
            elsif ($obstruction_position && positions_are_equal([$row_number, $col_number], $obstruction_position)) {
                print 'O';
            }
            else {
                print $col eq '^' ? '.' : $col;
            }
        }
        print "\n";
    }
    print "\n";
}

sub positions_are_equal {
    my ($first_position, $second_position) = @_;

    return join(',', @$first_position) eq join(',', @$second_position);
}