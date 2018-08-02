import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
//import { ConfigService } from "../services/ConfigService";
import { Loading, LoadingController} from "ionic-angular/umd";

@Injectable()
export class HomepageProvider {
  constructor(http: Http,
              // public  configService: ConfigService,
              public loadingCtrl: LoadingController) {
              this.http = http;

  }

  private apiUrl: string = 'http://hhajj.demo4dev.net/Service/';
  private http: Http;
  loader: Loading;

  public getHomeList() {
    return this.http.get(this.apiUrl + "json/")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getHomeItem(nid: string) {
    //this.presentLoading(this.configService.language.WaitTitle);
    return this.http.get(this.apiUrl + "json/" + nid)
      //.map(this.extractData,this.dismissLoading())
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getMainHomeItem() {
    //this.presentLoading(this.configService.language.WaitTitle);
    return this.http.get( this.apiUrl + "articles/front/main")
      //.map(this.extractData,this.dismissLoading())
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getAboutPage() {
    return this.http.get( this.apiUrl + "about")
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    return response.json();
  }

  private handleError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || "Server error.");
  }
  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }
  dismissLoading() {
    this.loader.dismiss();
  }

}
