import { PriorityQueue } from '@datastructures-js/priority-queue';
import { HuffmanNode, IHuffmanNode, compareNode } from './huffman_tree_node';

export default class HuffManTree {
    private table?: Map<string, number>;
    private huffmanTree?:HuffmanNode

    public getHuffmanTree() {
        return this.huffmanTree;
    }

    public getFrequencyTable() {
        return this.table;
    }

    /**
     * Function to create frequency table of characters from the text.
     *
     * @public
     * @param {string} text - The uncompressed text
     * @returns {Map<string, number>}
     */
    public createFrequencyTable(text: string): Map<string, number> {
        const table = new Map<string, number>;
        for (let i = 0; i < text.length; i++) {
            const key = text.charAt(i);
            table.set(key, (table.get(key) ?? 0) + 1);
        }
        this.table = table;
        return table;
    }

    /**
     * Function to create a Huffman tree from the frequency table.
     *
     * @public
     * @param {Map<string, number>} table - The frequency Table
     * @returns {HuffmanNode}
     */
    public buildHuffmanTree(table: Map<string,number>): HuffmanNode {
        // create initial n partial trees into a priority queue
        const queue = new PriorityQueue<IHuffmanNode>(compareNode);
        table.forEach((value, key) => {
            const node = new HuffmanNode(value, key, null, null);
            queue.enqueue(node);
        })

        // Remove the first two nodes from the priority queue
        // Join them and then put it back into the queue
        while (queue.size() > 1) {
            const right = queue.dequeue();
            const left = queue.dequeue();
            const node = new HuffmanNode(
                right.weight + left.weight,
                null,
                left, 
                right
            );
            queue.enqueue(node);
        }

        const tree = queue.dequeue();
        this.huffmanTree;
        return tree;
    }

    /**
     * Function to generate the codes corresponding to each lead nodes of the Huffman tree.
     *
     * @public
     * @param {HuffmanNode} root - The root of the Huffman Tree
     * @param {string} [prefix=''] - The code till this node
     * @param {Map<string, string>} [map=new Map()]
     * @returns {Map<string, string>} - A Map representing the code for each character
     */
    public parseHuffmanTree(
        root: HuffmanNode,
        prefix: string = '',
        map: Map<string, string> = new Map()
    ): Map<string, string> {
        const left = root.left;
        const right = root.right;
        if (root.value) {
            map.set(root.value, prefix);
        }
        if (left) {
            this.parseHuffmanTree(left, prefix + '0', map);
        }
        if (right) {
            this.parseHuffmanTree(right, prefix + '1', map);
        }
        return map;
    }
}