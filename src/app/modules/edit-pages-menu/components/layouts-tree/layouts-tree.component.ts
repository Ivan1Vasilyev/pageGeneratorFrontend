import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { layoutProviderService } from '../../services/provide-layout.service';
import { LayoutsProviderService } from '../../services/layouts-provider.service';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'layouts-tree',
  templateUrl: './layouts-tree.component.html',
})
export class LayoutsTreeComponent implements OnInit, OnDestroy {
  @Input() data: string[] = [];
  @Input() trigger: string = '';
  @Input() isRootNode = false;
  @Input() result: string = '';
  private subscriptions!: Subscription;

  constructor(
    private layoutProviderService: layoutProviderService,
    private layoutsProviderService: LayoutsProviderService
  ) {}

  dataMap: any;

  isExpandable(node: string): boolean {
    return this.dataMap?.has(node);
  }

  ngOnInit(): void {
    const layoutsSub = this.layoutsProviderService.getLayouts().subscribe((layouts) => {
      this.dataMap = new Map<string, string[]>(layouts);
    });
    this.subscriptions?.add(layoutsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.result = '';
  }

  getData(node: string) {
    of(this.dataMap.get(node)).subscribe((d) => {
      this.data = d || [];
    });
  }

  dirHandler(node: string) {
    if (!this.result.includes(node)) {
      this.result += this.result ? `.${node}` : node;
    }
  }

  emit(event: string) {
    this.layoutProviderService.setLayout(this.result + `.${event.trim()}`);
    this.result = '';
  }
}
