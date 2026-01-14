export class Column{
  name : string = '';
  title : string = '';
  visible : boolean = true;
  collapse : boolean = false;
  responsive : ColumnResponsiveConfig = {sm : true,md : true,lg : true};
  constructor(args: any | null = null) {
    if(args){
      this.name = args.name;
      this.title = args.title;
      this.visible = args.visible;
      this.collapse = args.collapse;
      this.responsive = args.responsive ? args.responsive : this.responsive;
    }
  }
}
export class ColumnResponsiveConfig{
  sm = true;
  md = true;
  lg = true;
}
