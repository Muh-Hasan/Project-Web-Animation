import React, { useLayoutEffect, useRef } from 'react';
import './App.css';
function App() {

  var background1 = useRef(null)
  var background2 = useRef(null)

  var foreground1 = useRef(null);
  var foreground2 = useRef(null);

  var redQueen_alice_sprite = useRef(null);
  useLayoutEffect(() => {
    var sceneryFrames = [
      { transform: 'translateX(100%)' },
      { transform: 'translateX(-100%)' }
    ];

    var sceneryTimingBackground = {
      duration: 36000,
      iterations: Infinity,
    };

    var sceneryTimingForeground = {
      duration: 12000,
      iterations: Infinity
    };

    var background1Movement = background1.current.animate(sceneryFrames, sceneryTimingBackground);
    // background1Movement.currentTime = background1Movement.effect.timing.duration / 2;

    var background2Movement = background2.current.animate(sceneryFrames, sceneryTimingBackground);

    var foreground1Movement = foreground1.current.animate(sceneryFrames, sceneryTimingForeground);
    // foreground1Movement.currentTime = foreground1Movement.effect.timing.duration / 2;

    var foreground2Movement = foreground2.current.animate(sceneryFrames, sceneryTimingForeground);

    var spriteFrames = [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-100%)' }
    ];

    var redQueen_alice = redQueen_alice_sprite.current.animate(
      spriteFrames, {
      easing: 'steps(7, end)',
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: Infinity
    });
    var sceneries = [foreground1Movement, foreground2Movement, background1Movement, background2Movement];


    var adjustBackgroundPlayback = function () {
      if (redQueen_alice.playbackRate < .8) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = redQueen_alice.playbackRate / 2 * -1;
        });
      } else if (redQueen_alice.playbackRate > 1.2) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = redQueen_alice.playbackRate / 2;
        });
      } else {
        sceneries.forEach(function (anim) {
          anim.playbackRate = 0;
        });
      }
    }
    adjustBackgroundPlayback();

    setInterval(function () {
      /* Set decay */
      if (redQueen_alice.playbackRate > .4) {
        redQueen_alice.playbackRate *= .9;
      }
      adjustBackgroundPlayback();
    }, 3000);

    var goFaster = function () {
      /* But you can speed them up by giving the screen a click or a tap. */
      redQueen_alice.playbackRate *= 1.1;
      adjustBackgroundPlayback();
    }

    document.addEventListener("click", goFaster);
    document.addEventListener("touchstart", goFaster);

  }, [])

  return (
    <div className="wrap">
      <div className="sky"></div>
      <div className="earth">
        <div className="red-queen_and_alice">
          <img className="red-queen_and_alice_sprite" ref={redQueen_alice_sprite} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place." />
        </div>
      </div>

      <div className="scenery foreground1" ref={foreground1}>
        <img className="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" " />
      </div>
      <div className="scenery foreground2" ref={foreground2}>
        <img className="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" " />
        <img className="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" " />
      </div>
      <div className="scenery background1" ref={background1}>
        <img className="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" " />
        <img className="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" " />
        <img className="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" " />
      </div>
      <div className="scenery background2" ref={background2}>
        <img className="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" " />

        <img className="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" " />
        <img className="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" " />
      </div>
    </div>
  );
}

export default App;
