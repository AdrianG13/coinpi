import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { Location, PopStateEvent } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Congreso Internacional de Procesos Industriales";

  private lastPoppedUrl: string | undefined;
  private yScrollStack: number[] = [];

  constructor(private router: Router, private location: Location) {
    this.lastPoppedUrl = undefined;
  }

  //funcionalidad para controlar el desplazamiento al cambiar de página.
  ngOnInit() {
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url || undefined;
    });

    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationStart) {
        if (ev.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (ev instanceof NavigationEnd) {
        if (ev.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop() || 0);
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
  }
}
