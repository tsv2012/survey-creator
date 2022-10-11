import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { PageNavigatorViewModel, PagesController } from "survey-creator-core";
import { CreatorModelComponent } from "../creator-model.component";

@Component({
  selector: "svc-page-navigator",
  templateUrl: "./page-navigator.component.html",
  styles: [":host { display: none; }"]
})
export class PageNavigatorComponent extends CreatorModelComponent<PageNavigatorViewModel> implements AfterViewInit {
  public model!: PageNavigatorViewModel;
  @Input() pagesController!: PagesController;
  @Input() pageEditMode!: string;
  @ViewChild("container") container!: ElementRef<HTMLDivElement>;
  createModel(): void {
    this.model = new PageNavigatorViewModel(
      this.pagesController,
      this.pageEditMode
    );
  }
  protected getModel(): PageNavigatorViewModel {
    return this.model;
  }
  protected getPropertiesToTrack(): string[] {
    return ["pagesController", "pageEditMode"];
  }
  public ngAfterViewInit(): void {
    if (this.pageEditMode !== "bypage") {
      const el = this.container.nativeElement;
      if (!!el && !!el.parentElement?.parentElement?.parentElement) {
        const self = this;
        el.parentElement.parentElement.parentElement.onscroll = function (this: GlobalEventHandlers, ev: Event) {
          return self.model.onContainerScroll(ev.currentTarget as HTMLDivElement);
        };
      }
    }
  }
  public override ngOnDestroy(): void {
    const el = this.container.nativeElement;
    if (!!el && !!el.parentElement?.parentElement?.parentElement) {
      el.parentElement.parentElement.parentElement.onscroll = <any>undefined;
    }
    this.model.dispose();
    super.ngOnDestroy();
  }
}