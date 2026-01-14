import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as bootstrap from 'bootstrap';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {MdlCambiarClaveComponent} from "../../components/modals/mdl-cambiar-clave/mdl-cambiar-clave.component";
import {GlobalService} from "../../services/global.service";
import {Genero} from "../../helpers/enums";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit, AfterViewInit {

  hideMenu = false;
  genero = Genero;

  constructor(
    public router: Router,
    public auth: AuthService,
    private bsModalService: BsModalService,
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    const triggerTabList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tab"]'))
    triggerTabList.forEach(function (triggerEl: any) {
      const tabTrigger = new bootstrap.Tab(triggerEl)

      triggerEl.addEventListener('click', function (event: any) {
        event.preventDefault()
        tabTrigger.show()
      })
    });

    this.initNavAccordion();
    this.initTooltip();
    this.initDropDown();
  }

  ngAfterViewInit(): void {

  }

  // Functions
  toggleHideMenu(): void{
    this.hideMenu = !this.hideMenu;
  }
  closeMenu(): void{
    this.hideMenu = true;
  }
  openMenu(): void{
    this.hideMenu = false;
  }

  initNavAccordion(): void{
    const BcollapseElements = [].slice.call(document.querySelectorAll('.menu-sub-accordion'))
    BcollapseElements.map(function (collapseEl: HTMLElement) {

      const parent = collapseEl.parentElement;

      collapseEl.addEventListener('show.bs.collapse', function (evt: Event) {
            evt.stopPropagation();
            collapseEl.style.display = 'block';
            parent?.classList.add('hover');
            parent?.classList.add('showing');
      });
      collapseEl.addEventListener('shown.bs.collapse', function (evt: Event) {
        evt.stopPropagation();
            collapseEl.style.display = '';
            collapseEl.style.overflow = '';
            parent?.classList.remove('showing');
            parent?.classList.add('show');
      });
      collapseEl.addEventListener('hide.bs.collapse', function (evt: Event) {
        evt.stopPropagation();
            parent?.classList.add('hiding');
            collapseEl.style.display = 'block';
            collapseEl.style.overflow = 'hidden';
      });
      collapseEl.addEventListener('hidden.bs.collapse', function (evt: Event) {
        evt.stopPropagation();
            parent?.classList.remove('hover');
            parent?.classList.remove('show');
            parent?.classList.remove('hiding');
            collapseEl.style.display = 'none';
            collapseEl.style.overflow = 'hidden';

            collapseEl.querySelectorAll('.menu-sub-accordion').forEach(x => {
              bootstrap.Collapse.getInstance(x)?.hide();
            });
      });


      return new bootstrap.Collapse(collapseEl,{
        parent: collapseEl.getAttribute('data-parent')?.toString(),
        toggle: false
      });

    });

    document.querySelectorAll('.menu-link').forEach(x => {
      x.addEventListener('click',  (event: any) => {
            event.preventDefault();
            bootstrap.Collapse.getInstance(x.nextElementSibling ? x.nextElementSibling : '')?.toggle();
      });
    });

  }

  initTooltip(): void{
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });
  }

  initDropDown(): void{
    const dropdownElementList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'))
    dropdownElementList.map(function (dropdownToggleEl: HTMLElement) {

      const dropdownMenu = dropdownToggleEl.nextElementSibling;

      console.log('menu',dropdownMenu);


      dropdownToggleEl?.addEventListener('show.bs.dropdown', (evt: Event) => {
        evt.stopPropagation();
        dropdownToggleEl?.classList.add('show');
        dropdownToggleEl?.classList.add('menu-dropdown');
        console.log(dropdownMenu);
        console.log('show');
      });
      dropdownToggleEl.addEventListener('hidden.bs.dropdown', (evt: Event) => {
        evt.stopPropagation();
        dropdownMenu?.setAttribute('style','');
        // console.log('hide');
      });


      return new bootstrap.Dropdown(dropdownToggleEl,{
        reference: 'toggle',
        display: 'dynamic'
      });
    });

  }

  // events
  onChangePassword(): void{
    this.bsModalService.show(MdlCambiarClaveComponent,{ id: new Date().getTime(), class: 'mw-650px modal-dialog-centered', keyboard: false, backdrop: "static",
      ignoreBackdropClick: true});
  }
}
