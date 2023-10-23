import { Component, Input, OnDestroy } from '@angular/core';
import { LayoutProviderService } from '../../services/layout-provider.service';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'layouts-tree',
  templateUrl: './layouts-tree.component.html',
})
export class LayoutsTreeComponent implements OnDestroy {
  @Input() data: string[] = [];
  @Input() trigger: string = '';
  @Input() isRootNode = false;
  @Input() result: string = '';
  @Input() dataMap!: Map<string, string[]>;
  private subscriptions: Subscription = new Subscription();

  constructor(private layoutProviderService: LayoutProviderService) {}

  isExpandable(node: string): boolean {
    return this.dataMap?.has(node);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.result = '';
  }

  getData(node: string) {
    const sub = of(this.dataMap.get(node)).subscribe((d) => {
      this.data = d || [];
    });
    this.subscriptions.add(sub);
  }

  dirHandler(node: string) {
    if (!this.result.includes(node)) {
      this.result += this.result ? `.${node}` : node;
    }
  }

  emitResult(event: string) {
    this.layoutProviderService.setLayout(`layouts.${this.result}` + `.${event.trim()}`);
    this.result = '';
  }
}
