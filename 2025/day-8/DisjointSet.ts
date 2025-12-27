export default class DisjointSet {
    private parent: number[];
    public size: number[];

    constructor(size: number) {
        // Create an array of parent indexes, from 0 to size.
        this.parent = [...Array(size).keys()];

        // Track the size of each set
        this.size = Array(size).fill(1);
    }

    /**
     * Finds the root element for a number - the element that represents
     * the set that it's in
     * @param x - The number to find the root element for.
     * @returns - The root element.
     */
    find(x: number): number {
        if (this.parent[x] === x) return x;

        // Set each parent to point to the root element, to speed up future searches
        return this.parent[x] = this.find(this.parent[x]!);
    }

    /**
     * Creates a union between the sets of two elements.
     * Finds the root (set representative) element for each of them, and joins the two sets.
     * Has no effect if both elements are already in the same set.
     * @param x - One element.
     * @param y - Another element.
     */
    union(x: number, y: number): void {
        const rootX = this.find(x);
        const rootY = this.find(y);

        // If two elements are already in the same set, do nothing
        if (rootX === rootY) return;

        const xSize = this.size[rootX]!;
        const ySize = this.size[rootY]!;

        // Connect the smaller set to the bigger set
        if (xSize < ySize) {
            this.parent[rootX] = rootY;
            this.size[rootY]! += this.size[rootX]!;
        } else if (xSize > ySize) {
            this.parent[rootY] = rootX;
            this.size[rootX]! += this.size[rootY]!;
        }
        else {
            // if both sets are equally sized
            this.parent[rootY] = rootX;
            this.size[rootX]! += this.size[rootY]!;
        }
    }
}
