use strict;
use warnings;
use feature 'say';

open(my $fh, '<', 'inputs/day-8.txt') or die "Cannot open input file: $!";
my $input = do { local $/; <$fh> };
close($fh);

my @rows      = split /\n/, $input;
my $row_limit = scalar @rows - 1;
my $col_limit = length( $rows[0] ) - 1;
my ($antennas_by_frequency, $antennas_by_position) = find_antennas(@rows);

say 'Part 1: ' . solve();
say 'Part 2: ' . solve(1);

sub solve {
    my ($account_for_resonant_harmonics) = @_;
    my %all_antinode_positions;

    foreach my $frequency ( keys %$antennas_by_frequency ) {
        my @positions = @{ $antennas_by_frequency->{$frequency} };

        foreach my $position (@positions) {
            foreach my $other_position (@positions) {
                my $antinode_positions = find_antinode_positions($position, $other_position, $account_for_resonant_harmonics);
                next unless $antinode_positions;

                foreach my $antinode_position (@$antinode_positions) {
                    my $position_key = join(',', @$antinode_position);
                    if ($account_for_resonant_harmonics) {
                        $all_antinode_positions{$position_key} = 1;
                    }
                    else {
                        $all_antinode_positions{$position_key} = 1;
                    }
                }
            }
        }
    }

    my %result = %all_antinode_positions;
    if ($account_for_resonant_harmonics) {
        foreach my $antenna_position (keys %$antennas_by_position) {
            $result{$antenna_position} = 1;
        }
    }

    return scalar keys(%result);
}

sub find_antinode_positions {
    my ($first_position, $second_position, $account_for_resonant_harmonics) = @_;

    my @antinode_positions;

    my $row_distance = $first_position->[0] - $second_position->[0];
    my $col_distance = $first_position->[1] - $second_position->[1];

    return undef if $row_distance == 0 && $col_distance == 0;

    my $antinode_row = $first_position->[0] - ($row_distance * 2);
    return undef unless row_in_bounds($antinode_row);
    my $antinode_col = $first_position->[1] - ($col_distance * 2);
    return undef unless col_in_bounds($antinode_col);

    push @antinode_positions, [$antinode_row, $antinode_col];

    if ($account_for_resonant_harmonics) {
        while (1) {
            $antinode_row -= ($row_distance);
            last unless row_in_bounds($antinode_row);
            $antinode_col -= ($col_distance);
            last unless col_in_bounds($antinode_col);

            push @antinode_positions, [$antinode_row, $antinode_col];
        }
    }

    return \@antinode_positions;
}

sub row_in_bounds {
    my ($row) = @_;
    return $row >= 0 && $row <= $row_limit;
}

sub col_in_bounds {
    my ($col) = @_;
    return $col >= 0 && $col <= $col_limit;
}

sub find_antennas {
    my (@rows) = @_;
    my (%antennas_by_frequency, %antennas_by_position);

    foreach my $row_number ( 0 .. $row_limit ) {
        my @row = split //, $rows[$row_number];

        foreach my $col_number ( 0 .. $col_limit ) {
            my $value = $row[$col_number];

            if ( $value ne '.' ) {
                push @{ $antennas_by_frequency{$value} }, [ $row_number, $col_number ];
                $antennas_by_position{"$row_number,$col_number"} = $value;
            }
        }
    }

    return (\%antennas_by_frequency, \%antennas_by_position);
}

# For debugging: prints the grid with all antennas and antinode positions
sub print_grid {
    my (%antinode_positions) = @_;
    my %antennas;

    foreach my $frequency ( keys %$antennas_by_frequency ) {
        foreach my $position ( @{ $antennas_by_frequency->{$frequency} } ) {
            $antennas{ $position->[0] . ',' . $position->[1] } = $frequency;
        }
    }

    foreach my $row ( 0 .. $row_limit ) {
        foreach my $col ( 0 .. $col_limit ) {
            my $position_key      = "$row,$col";
            my $antenna_frequency = $antennas{$position_key};

            if (defined $antenna_frequency) {
                print $antenna_frequency;
            }
            elsif ($antinode_positions{$position_key}) {
                print '#';
            }
            else {
                print '.';
            }
        }
        print "\n";
    }
}
