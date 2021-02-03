import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UbigeoNuevo } from '../models/ubigeo';
import Ubigeo, { District, Region, Province } from "ubigeos";

@Injectable()

export class DataService {

  private urlEndPoint: string = 'http://localhost:8082/api/ubigeos';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  create(ubigeoNuevo: UbigeoNuevo): Observable<UbigeoNuevo> {
    ubigeoNuevo.departamento = Region.instance(ubigeoNuevo.departamento).getName();
    ubigeoNuevo.provincia = Province.instance(ubigeoNuevo.provincia).getName();
    ubigeoNuevo.ubigeo = District.instance(ubigeoNuevo.distrito).getCode();
    ubigeoNuevo.distrito = District.instance(ubigeoNuevo.distrito).getName();
    return this.http.post<UbigeoNuevo>(this.urlEndPoint, ubigeoNuevo, {headers: this.httpHeaders});
  }
}
