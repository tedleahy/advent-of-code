use strict;
use warnings;

my $input = do {
    local $/;
    open my $fh, '<', 'inputs/day-5.txt' or die "Error reading file: $!";
    <$fh>;
};

my ($page_ordering_rule_lines, $update_lines) = split(/\n\n/, $input);
my @updates = map { [split(/,/, $_)] } split(/\n/, $update_lines);

my %page_ordering_rules;
foreach my $ordering_rule ( split(/\n/, $page_ordering_rule_lines) ) {
    my ($before, $after) = split(/\|/, $ordering_rule);

    $page_ordering_rules{"$before,$after"} = 1;
}

sub sort_page_numbers {
    my ($page_numbers) = @_;

    return sort { $page_ordering_rules{"$a,$b"} ? -1 : 1 } @$page_numbers;
}

sub solve {
    my ($part_number) = @_;

    my $middle_page_numbers_total = 0;

    foreach my $page_numbers (@updates) {
        my @sorted_page_numbers = sort_page_numbers($page_numbers);
        my $pages_are_sorted = "@$page_numbers" eq "@sorted_page_numbers";

        if ($part_number == 1 && $pages_are_sorted) {
            $middle_page_numbers_total += $page_numbers->[@$page_numbers / 2];
        }

        if ($part_number == 2 && !$pages_are_sorted) {
            $middle_page_numbers_total += $sorted_page_numbers[@sorted_page_numbers / 2];
        }
    }

    return $middle_page_numbers_total;
}

printf "Part 1: %d\n", solve(1);
printf "Part 2: %d\n", solve(2);