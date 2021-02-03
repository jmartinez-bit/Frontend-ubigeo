import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import Ubigeo, { District, Region, Province } from "ubigeos";
import { UbigeoNuevo } from 'src/app/models/ubigeo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DataService]
})
export class FormComponent implements OnInit {
  public region: Region[] = [];
  public provincias: Province[];
  public distritos: District[];
  public ubigeo:string = "";
  public ubigeoNuevo: UbigeoNuevo = new UbigeoNuevo();

  constructor(private dataSvc: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    for (let i=1; i<=25; i++) {
      if(i<10) {
        this.region[i] = Region.instance(`0${i}`);
      }else {
        this.region[i] = Region.instance(`${i}`);
      }
    }
    this.region = this.region.filter(reg => reg != null);
  }

  onSelect(id:string):void {
    if(id) {
      this.provincias = Region.instance(id).getProvincies().filter(provincia => provincia != null);
      this.distritos = null;
      this.ubigeo = null;
    }else {
      this.provincias = [];
    }
  }
  
  filtroProvincia(id:string):void {
    if(id) {
      this.distritos = Province.instance(id).getDistricts().filter(distrito => distrito != null);
      this.ubigeo = null;
    }else {
      this.distritos = null;
    }
  }

  obtenerUbigeo(id:string):void {
    this.ubigeo = id;
  }

  public create():void{
    this.dataSvc.create(this.ubigeoNuevo).subscribe();
  }
}
