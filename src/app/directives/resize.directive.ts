import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import type { AfterViewInit } from '@angular/core';
npm
/**
 * This directive allows to hook HTML element resize
 */
@Directive({
  selector: '[hookResize]',
})
export class ResizeDirective implements AfterViewInit, OnDestroy {
  /**
   * An optional CSS query to select an HTML element within the host element
   */
  @Input() public set hookResize(value: string | string[] | null) {
    this.queries = value;
    // Hook only if the component has been initialised,
    // i.e. ngAfterViewInit has already passed
    if (this.el) {
      this.hook();
    }
  }
  public get hookResize(): string | string[] | null {
    return this.queries;
  }

  /**
   * This event will be emitted when a resize event occurs
   */
  @Output() public readonly resize = new EventEmitter<ResizeObserverEntry>();

  private queries: string | string[] | null = null;
  private observer: ResizeObserver;
  private prvQueries: string[] = [];

  public constructor(
    @Inject(ElementRef) private readonly el: ElementRef<Element>
  ) {
    this.observer = new ResizeObserver((entries: ResizeObserverEntry[]) =>
      entries.forEach((e) => this.resize.emit(e))
    );
  }

  public ngAfterViewInit(): void {
    this.hook();
  }

  public ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private hook(): void {
    if (!this.el) {
      throw new Error('HookResizeDirective: host not found.');
    }
    // Map to array
    const allQueries = Array.isArray(this.queries)
      ? this.queries
      : [this.queries];
    // Make distinctive
    const queries = allQueries.map(q => q ? q : '').filter((v, i, a) => i === a.indexOf(v));
    // Unobserve
    this.prvQueries.filter(pq => !queries.some(q => q === pq)).forEach(pq => {
      const element = this.getElement(pq);
      if(element) {
        this.observer.unobserve(element);
      } else {
        console.warn(`HookResizeDirective: not found element for "${pq}". Cannot unobserve.`);
      }
    });
    // Observe
    queries.filter(q => !this.prvQueries.some(pq => pq === q)).forEach((q) => {
      const element = this.getElement(q);
      if (!element) {
        console.warn(`HookResizeDirective: not found element for "${q}". Cannot observe.`);
      } else {
        this.observer.observe(element);
      }
    });
    // Save previous queries
    this.prvQueries = queries;
  }

  private getElement(query: string): Element | null {
    return query ? this.el.nativeElement.querySelector(query) : this.el.nativeElement;
  }
}
