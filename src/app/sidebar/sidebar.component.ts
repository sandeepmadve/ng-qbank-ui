import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  filters: any = {
    'language': ['java', 'aws', 'spring'],
    'resolution': [],
    'tag': [],
    'type': []
  };
  public radioGroupForm: FormGroup;
  langFilterMenuOpen: boolean = false;
  resFilterMenuOpen: boolean = false;
  tagFilterMenuOpen: boolean = false;
  typeFilterMenuOpen: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.radioGroupForm = this.formBuilder.group({
      'model': 1
    });
  }

  clearAllFilters(){
    this.filters['language'] = [];
    this.filters['resolution'] = [];
    this.filters['tag'] = [];
    this.filters['type'] = [];
  }

  changeFilter(key:string, value: string){
    if(this.filters[key].includes(value)){
      this.filters[key].splice(this.filters[key].indexOf(value), 1)
    }else{
      this.filters[key].push(value)
    }
  }
}
