import { Component, Input, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import {
  MatTreeNestedDataSource,
  MatTreeModule,
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

const layoutsTree: iLayoutsTree[] = [
  {
    name: 'moscow-beeline',
    children: [
      {
        name: 'main',
        children: [
          {
            name: 'actions',
            children: [
              {
                name: 'dacha',
              },
              { name: 'promo' },
            ],
          },
          {
            name: 'tariffs',
            children: [
              {
                name: 'internet',
              },
              { name: 'internet-tv' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'megafon',
  },
];

const TREE_DATA: iLayoutsTree[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

export interface iLayoutsTree {
  name: string;
  children?: iLayoutsTree[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'layouts-tree',
  templateUrl: './layouts-tree.component.html',
  styleUrls: ['./layouts-tree.component.scss'],
})
export class LayoutsTreeComponent implements OnInit {
  @Input() layoutsTree!: iLayoutsTree[];

  private _transformer = (node: iLayoutsTree, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  ngOnInit(): void {
    this.dataSource.data = this.layoutsTree;
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
