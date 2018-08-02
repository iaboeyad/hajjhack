import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { HomepageProvider } from "../../providers/homepage.provider";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public navCtrl: NavController;
  public homeService: HomepageProvider;
  //public popoverCtrl: PopoverController;
  public errorMessage: string;
  public homeList: any = [];
  public homeListCopy: any = [];
  public mainList: any = [];
  public mainListCopy: any = [];
  public searchQuery: string = '';
  public section: string = 'All';
  loader : Loading ;

  constructor(navCtrl: NavController, homeService: HomepageProvider,
              // popoverCtrl: PopoverController,
              public modalCtrl: ModalController, public loadingCtrl : LoadingController) {
    this.navCtrl = navCtrl;
    this.homeService = homeService;
    //this.popoverCtrl = popoverCtrl;
  }
  loaded: boolean;
  // detail(nid: number) {
  //   this.navCtrl.push(HomeDetailsPage, { nid: nid });
  // }

  loadHome(refresher?: any) {
    if (refresher) {
      setTimeout(() => {
        refresher.complete();
      }, 3000);
    }
    this.presentLoading('');
    this.homeService.getHomeList().subscribe(
      (home) => {
        // if (this.section == 'الأولى') {
        //   news = news.filter((item) => { return (item.Section === this.section) });
        // }
        this.dismissLoading();
        this.homeList = home;
        if(refresher) {
          refresher.complete();
        }
        this.homeListCopy = this.homeList;
        //this.search();
      },
      error => this.errorMessage = error);

    this.homeService.getMainHomeItem().subscribe(
      (homeMain) => {

        this.mainList = homeMain;
        if(refresher) {
          refresher.complete();
        }
        this.mainListCopy = this.mainList;
        //this.search();
      },
      error => this.errorMessage = error);
  }
  ngOnInit() {
    //this.loadHome();
  }
  // openAboutPage() {
  //   const placePageModal = this.modalCtrl.create(AboutPage);
  //   placePageModal.present();
  //   placePageModal.onDidDismiss(
  //     () => {
  //
  //     }
  //   );
  // }
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

