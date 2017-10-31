import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ImageServiceProvider } from '../providers/image-service/image-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  shownGroup = null;
  pages: Array<{title: string, component: any}>;
  rootPath :any;
  folders :any;
  nestedList :any;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public events: Events, private imgService : ImageServiceProvider) {
    this.initializeApp();
    //this.rootPath = '/Users/chitrang/IdeaProjects/xl-release-new/regression/protractor-cucumber/scenario'
    this.events.subscribe('rootpath:applied',(rootpath)=>{
      this.rootPath = rootpath;
      this.loadScenarios();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.rootPath = JSON.parse(localStorage.getItem('rootPath'))!=null ? JSON.parse(localStorage.getItem('rootPath')).path:null;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loadScenarios();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  isArray(val){
    console.log(typeof val);
    return true;
    //return typeof val !== 'undefined';
  }

  loadScenarios(){
    if(this.rootPath){
      this.imgService.loadScenarios(this.rootPath)
      .then((res:any)=>{
          this.folders = JSON.parse(res._body);
          this.folders.sort(function(a, b){
            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1 
            if (nameA > nameB)
                return 1
            return 0 //default return value (no sorting)
        })
      })
    }else{
      this.folders=null;
    }
    
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.nestedList = null;
        this.folders[group].children.forEach(element => {
            if(element.name=='baseline'){
              this.nestedList =  element.children;
            }
        });
        this.shownGroup = group;
    }
  };

  isGroupShown(group) {
      return this.shownGroup === group;
  };

  openFile(filePath){
    this.nav.setRoot(HomePage,{fileSrc :filePath});
  }

  reloadScenarios(){
    this.rootPath = JSON.parse(localStorage.getItem('rootPath')).path;
    this.loadScenarios();
  }


  
}
