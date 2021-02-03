import { Component, OnInit } from '@angular/core';
import { CountryI, CityI, Regiones, Provincias } from '../../models/model.interface';
import { DataService } from '../../services/data.service';
import Ubigeo, { District, Region, Province } from "ubigeos";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DataService]
})
export class FormComponent implements OnInit {
  public selectedCountry: CountryI={id: 0, name: ''};
  public countries: CountryI[];
  public cities: CityI[];
  public region: Region[] = [];
  public provincias: Province[] = [];
  public distritos: District[] = [];
  public ubigeo:string = "";
  public selectedRegion: Regiones = {id: 0, name: ''};

  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    this.countries = this.dataSvc.getCountries();
    for (let i=1; i<=25; i++) {
      if(i<10) {
        this.region[i] = Region.instance(`0${i}`);
      }else {
        this.region[i] = Region.instance(`${i}`);
      }
    }
    this.region = this.region.filter(reg => reg != null);
    // this.regiones = this.dataSvc.getRegiones();
  }

  onSelect(id:string):void {
    this.provincias = Region.instance(id).getProvincies().filter(provincia => provincia != null);
  }
  
  filtroProvincia(id:string):void {
    this.distritos = Province.instance(id).getDistricts().filter(distrito => distrito != null);
  }

  obtenerUbigeo(id:string):void {
    this.ubigeo = id;
  }
  // onSelect(id: number):void {
  //   this.cities = this.dataSvc.getCities().filter(item => item.countryId
  //     == id);
  // }
}
