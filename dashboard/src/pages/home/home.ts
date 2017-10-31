import { Component } from '@angular/core';
import { NavController,NavParams,Events } from 'ionic-angular';
import { ImageServiceProvider } from '../../providers/image-service/image-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imageType:string='baseline';
  imgSrc :any;
  rootPath:any;
  folders:any;
  imagePath:any;
  shownGroup = null;
  constructor(public navCtrl: NavController,private navParam: NavParams ,public events: Events, private imgService : ImageServiceProvider) {
    this.rootPath = JSON.parse(localStorage.getItem('rootPath'))!=null ? JSON.parse(localStorage.getItem('rootPath')).path:null;
    if(this.navParam.get('fileSrc')){
      this.imageType = 'baseline';
      this.imagePath = this.navParam.get('fileSrc');
      this.loadImage(this.imagePath);
    }
  }

  selectImageType(value){
    if(this.imagePath){
      if(value==='actual'){
        this.imagePath = this.imagePath.replace('baseline','.tmp/actual');
        this.imagePath = this.imagePath.replace('.tmp/diff','.tmp/actual');
       
      }else if(value==='diff'){
        this.imagePath = this.imagePath.replace('baseline','.tmp/diff');
        this.imagePath = this.imagePath.replace('.tmp/actual','.tmp/diff');
        
      }else if(value=='baseline'){
        this.imagePath = this.imagePath.replace('.tmp/diff','baseline');
        this.imagePath = this.imagePath.replace('.tmp/actual','baseline');
        
      }
      this.loadImage(this.imagePath);
    }
    
  }

  addRootPath(){
    localStorage.setItem('rootPath', JSON.stringify({ path: this.rootPath}));
    this.events.publish('rootpath:applied',this.rootPath);
  }

  loadImage(filePath){
    this.imgService.getImage(filePath)
      .then((img : any)=>{
        this.imgSrc = img.url;
      })
  }


  acceptDifference(){
    let basePath = this.imagePath.replace('.tmp/diff','baseline');
    let actualPath = this.imagePath.replace('.tmp/diff','.tmp/actual');
    this.imgService.acceptActualImage(basePath,actualPath)
      .then(res=>{
        console.log(res);
      });
  }



}
