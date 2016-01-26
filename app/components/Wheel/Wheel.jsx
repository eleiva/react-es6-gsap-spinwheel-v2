import React from 'react';
import TimeLineMax from 'gsap';
import TweenLite from 'gsap';
import styles from './_Wheel.scss';


export default class Wheel extends React.Component {
  constructor() {
    super();
    this.state = {
      awardHidden: true
    };
  }

  componentDidMount() {
 //   console.log("Props:" + JSON.stringify(this.props));
  }

   handleSpin(){
    let that = this;
    console.log(this.props.config);
    $.ajax({
          url: this.props.config.canAttemptUrl,
          type: 'POST',
          dataType: 'json',
          data: {data : this.props.config.data},
          success: function(data){
            if ( data.can_attempt ){
               spin();
               console.log(data);
            } else {
                alert('Please come back later to play again');
            }
          }
    });

    var spin = function (){
      var wheel = that.refs.wheel;
      var indicator = that.refs.indicator;
      var offset  = 30;

      var awards = [
        {prize: 10, startAngle: 0   , endAngle: 60  , icon: "star"    },
        {prize: 20, startAngle: 60  , endAngle: 120 , icon: "heart"   },
        {prize: 30, startAngle: 120 , endAngle: 180 , icon: "smile"   },
        {prize: 40, startAngle: 180 , endAngle: 240 , icon: "comment" },
        {prize: 50, startAngle: 240 , endAngle: 300 , icon : "bell"   },
        {prize: 60, startAngle: 300 , endAngle: 360 , icon: "light"   }
      ];
       var fullspin  = ( Math.floor(Math.random() * (360 - 1 + 1)) + 1) + (360 * 5 );
      var prizeMsg   = null;
      var prizeValue   = null;
      var spin    = (fullspin % 360) - 30;

      awards.forEach(function(element, index, array){
        if ( element.startAngle <= spin && element.endAngle >= spin ) {
          prizeMsg = element.prize;
          prizeValue = element.prize;
        }
      });

      TweenMax.to(wheel, 2, {rotation: fullspin,  transformOrigin:"50% 50%" , onUpdateParams:[wheel],
        onComplete: function(){
          that.setState({ awardHidden: false, prize : prizeMsg});
          that.props.config.data['award'] = prizeValue;
          $.ajax({
            url: that.props.config.attemptUrl,
            type: 'POST',
            dataType: 'json',
            data: {data : that.props.config.data},
            success: function(data){
                  if ( data.success ){
                    that.props.config.success(data);
                  } else {
                    alert('Error',data);
                  }
              }
           });
        },
        onUpdate: function(data){
          //
        }
      });
    }
  }

  render() {
    return (
      <div>
        <div id="wrapper" className={styles.wrapper} ref="wrapper">
              <div id="wheel" className={styles.wheel} ref="wheel">
                   <div  id="inner-wheel" className={styles.innerwheel}>
                      <div ref="sec" className={styles.sec}><span className={styles.fa}>50</span></div>
                      <div ref="sec" className={styles.sec}><span className={styles.fa}>40</span></div>
                      <div ref="sec" className={styles.sec}><span className={styles.fa}>30</span></div>
                      <div ref="sec" className={styles.sec}><span className={styles.fa}>20</span></div>
                      <div ref="sec" className={styles.sec}><span className={styles.fa}>10</span></div>
                      <div ref="sec" className={styles.sec}><span className={styles.fa}>60</span></div>
                  </div>
              </div>
              <div id="spin" className={styles.spin} ref="indicator" onClick={this.handleSpin.bind(this)}>
                <div id="inner-spin" className={styles.innerspin}></div>
              </div>
              <div id="shine"className={styles.shine}></div>
              <div id="txt"></div>
          </div>
          { !this.state.awardHidden ? 
              <div id="awardPanel" className={styles.awardPanel} ref="award">You won {this.state.prize} points !</div>
            : null }
        </div>
    );
  }
}
