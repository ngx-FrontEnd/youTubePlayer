import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MaskApplierService } from 'ngx-mask';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;
  seconds: any;

  form: FormGroup;
  constructor(private fb: FormBuilder, private maskService: MaskApplierService) {
    this.form = this.fb.group({
      title: [],
      time: [],
      des: []
    });
    console.log(maskService.applyMask('1234', '00:00'));

  }
  phoneNumber: any;


  init() {
    // Return if Player is already created
    if (window['YT']) {
      this.startVideo();
      return;
    }

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  ngOnInit() {
    this.video = '2OHbjep_WjQ';
    this.init();
    console.log(this.jumpTime);

  }

  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      videoId: this.video,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 1,
        fs: 0,
        playsinline: 1
      },
      events: {
        onReady: this.onPlayerReady
      }
    });
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }

  jumpTime: any;

  storeValue: textField[] = [];

  get getValue() {
    let title: string = this.form.get('title').value;
    let t: any = this.form.get('time').value;
    let time: any = this.maskService.applyMask(t, '00:00:00');
    let description: string = this.form.get('des').value;
    return { title, time, description };
  }
  pushValue() {
    this.storeValue.push(this.getValue);
    this.form.reset();
    // console.log(this.storeValue);

  }
  countSeconds(str: any) {
    // let st = this.maskService.applyMask(str, '00:00:00');

    const [hh = '0', mm = '0', ss = '0'] = (str || '0:0:0').split(':');
    const hour = parseInt(hh, 10) || 0;
    const minute = parseInt(mm, 10) || 0;
    const second = parseInt(ss, 10) || 0;

    // console.log(hour * 3600 + minute * 60 + second);
    this.jumpTime = hour * 3600 + minute * 60 + second;
    // return hour * 3600 + minute * 60 + second;
    if (this.player) {
      this.seconds = this.jumpTime;
      this.player.seekTo(this.seconds, true);
    }
  }
}

export interface textField {
  title: string;
  time: number;
  description: string;
}
