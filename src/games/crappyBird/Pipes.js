import React from 'react';
import Engine from '../../classes/Engine/Engine';


function Pipe({id, pos, rotation, score})
{
  const [context, setContext] = React.useContext(Engine.getContext());

  React.useEffect(() => {
    context[id] = {
      'tag': 'obstacle'
    };

    if (score)
    {
      context[`${id}_score`] = {
        'tag': 'score'
      };
    }

    setContext({...context});
  }, []);

  if (!rotation)
  {
    rotation = 0;
  }

  const styleRoot = {
    position: `fixed`,
    willChange: `transform`,
    transform: `translate3d(${pos?.x}vh, ${pos?.y}vh, 0) rotate(${rotation}deg)`,
  };

  return (
    <div style={styleRoot}>
      <svg id={id} height="100vh" version="1.1" viewBox="0 0 70 514.19" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-65 8.2278)" fill="#999" stroke="#000" strokeLinejoin="round">
          <rect transform="scale(1,-1)" x="70.798" y="-505.16" width="58.404" height="478.4" rx="0" ry="0" imageRendering="auto" strokeWidth="1.5964" style={{mixBlendMode: 'normal'}}/>
          <rect transform="scale(1,-1)" x="65.694" y="-26.078" width="68.612" height="33.612" ry="5.2732" strokeWidth="1.3882" style={{mixBlendMode: 'normal'}}/>
        </g>
      </svg>
      {score &&
      <span
        id={`${id}_score`}
        style={{
          position: 'fixed',
          willChange: 'transform',
          transform: 'translate3d(0, -30vh, 0px)',
          height: '40vh',
          width: '0.1vh',
        }}
      />
      }
    </div>
  );
}

function getRandomInt(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getStartPos(index, offset, min, max)
{
  return Engine.getPos({
    x: ((offset * index) + offset),
    y: getRandomInt(min, max),
  });
}

function PipeSet({index, offset, spacing, numberOfPipes, min, max, speed})
{
  const [end, setEnd] = React.useState(false);
  const [pos, setPos] = React.useState(getStartPos(index, offset + 3.5, min, max));

  React.useEffect(() => {
    if (end)
    {
      setPos(getStartPos(numberOfPipes - 1, offset, min, max));
    }
  }, [end]);

  React.useEffect(() => {
    function move()
    {
      if (pos.x > -12.7)
      {
        pos.x += (-speed) * Engine.getTime().getTimeScale();
      }
      else
      {
        setEnd(!end);
      }

      setPos(Engine.getPos({...pos}));
    };

    Engine.fixedUpdate(move);
  }, [pos]);

  let posDown = {...pos};
  if (posDown?.y != null)
  {
    posDown.y -= spacing;
  }

  return (
    <span>
      <Pipe
        id={`${index}_up`}
        pos={pos}
        score={true}
      />
      <Pipe
        id={`${index}_down`}
        pos={posDown}
        rotation={180}
      />
    </span>
  );
}

function GroundImage({style, className})
{
  return (
    <>
      <svg style={style} className={className} width="1e3" height="100" version="1.1" viewBox="0 0 264.58 26.458" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0 -33.928)">
          <rect x="-2.2204e-16" y="33.928" width="264.58" height="26.458" fill="#f4d7d7" fillRule="evenodd"/>
          <g transform="matrix(.49078 0 0 .46555 -44.859 21.129)" fillRule="evenodd" stroke="#000" strokeLinejoin="round" strokeWidth=".347">
          <path d="m232.39 52.582c-2.7739-3.2875-2.7764-6.2115-1.1295-10.3 1.6469-4.0883 2.8142-9.2244 6.6092-10.731s6.0507 2.9549 9.3078 5.4704 5.9833 6.6824 5.3466 11.053c-0.63678 4.3707-4.357 5.442-8.5328 6.8237-4.1758 1.3817-8.8274 0.97135-11.601-2.3161z" fill="#59f"/>
          <path d="m235.71 35.42c0.71688-1.0108 2.0468-1.5649 3.2507-1.5409 1.2039 0.02402 2.6361 0.27067 3.3168 1.394 0.68071 1.1234-0.0123 2.3563-0.72132 3.3752-0.70901 1.0189-1.2883 1.2956-2.4767 1.5091s-1.9735-0.4772-2.4921-1.5698c-0.51856-1.0926-1.5943-2.1569-0.87738-3.1677z" fill="#acf"/>
          </g>
          <g transform="matrix(.46703 0 0 .44347 -10.237 16.953)" fillRule="evenodd" stroke="#000" strokeLinejoin="round" strokeWidth=".347">
          <path d="m102.38 61.462c0.39751-3.2526-1e-3 -7.038 1.5764-9.64 1.8216-3.0039 4.9383-4.102 7.9542-6.2623 2.6124-1.8713 6.419-1.3892 9.6434-1.6114 3.7225-0.25654 6.4919 0.63452 9.6696 2.6942 2.7525 1.7841-0.0286 4.4023 1.3959 7.3901 1.6445 3.4493 5.8573 6.7297 5.8812 10.478 0.0208 3.2471-4.2936 2.7-5.5945 5.4612-1.5019 3.1878-0.23408 6.0477-3.407 7.5966-2.7483 1.3417-5.8388-0.01753-8.95-0.08741-3.5917-0.08068-7.4778 0.41889-10.896-1.2394-2.9606-1.4364-2.0969-4.4701-3.4179-7.2219-1.5251-3.1769-4.3146-3.803-3.8556-7.5581z" fill="#59f"/>
          <path d="m120.89 47.617c2.9186-1.2563 6.2152-0.60844 8.9529 0.6309 1.3852 0.62704 1.7221 2.4466 1.3923 3.8911-0.65187 2.855-1.9643 4.9756-4.6154 6.7584-1.3413 0.90201-3.0198 0.93044-4.291 0.0074-2.5125-1.8244-3.7911-4.7532-3.7685-7.8603 0.0114-1.572 0.85309-2.7918 2.3297-3.4274z" fill="#acf"/>
          </g>
          <g transform="matrix(.57673 0 0 .58846 -46.355 29.259)" fillRule="evenodd" stroke="#000" strokeLinejoin="round" strokeWidth=".347">
          <path d="m111.23 19.74c1.401 4.6142 0.37061 8.1346-2.1204 12.455-2.491 4.3204-7.021 6.6319-11.511 5.3382-4.4898-1.2938-7.9586-4.004-9.8867-8.3418-1.928-4.3378-0.74207-10.72 1.7119-14.728 2.454-4.0086 8.0746-1.8132 12.899-1.008 4.8248 0.80516 7.5055 1.6705 8.9066 6.2848z" fill="#59f"/>
          <path d="m91.351 14.594c0.90086-0.93514 1.8128-0.93921 3.2087-0.83482 1.4541 0.10874 2.8659 1.2074 3.2438 2.4996 0.36278 1.2404 0.06187 2.4491-0.8753 3.4789-0.97628 1.0727-2.4971 1.6018-3.947 1.4263-1.3919-0.16848-1.9342-1.4926-2.3327-2.7424-0.41515-1.302-0.23596-2.8535 0.70248-3.8276z" fill="#acf"/>
          </g>
          <g transform="matrix(.55095 0 0 .64174 71.93 20.307)" fillRule="evenodd">
          <rect x="16.82" y="47.908" width="12.095" height="3.4963" fill="#fea" stroke="#000" strokeLinejoin="round" strokeWidth=".2"/>
          <g fill="#f4eed7">
            <rect x="16.82" y="51.405" width="47.436" height="1.3229" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".2"/>
            <rect x="35.246" y="52.728" width="29.01" height="1.4174" stroke="#000" strokeLinejoin="round" strokeWidth=".2"/>
            <rect x="35.341" y="52.279" width="28.821" height="1.1812"/>
          </g>
          </g>
          <g transform="matrix(.56635 0 0 .58818 -10.202 13.569)">
          <g transform="translate(0 -.80181)" fillRule="evenodd" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".2">
            <rect x="57.196" y="46.505" width="17.239" height="26.727" rx="1.2027" ry="3.8754" fill="#f4e3d7"/>
            <rect x="62.909" y="38.019" width="5.1449" height="8.3522" rx="1.2027" ry="3.8754" fill="#c8beb7"/>
          </g>
          <rect x="59.267" y="52.986" width="13.096" height="6.1472" fill="#ececec" fillRule="evenodd" stroke="#000" strokeLinejoin="round" strokeWidth=".165"/>
          <text transform="scale(.93751 1.0667)" x="63.47168" y="54.082645" fill="#000000" fontFamily="sans-serif" fontSize="4.304px" strokeWidth=".1076"><tspan x="63.47168" y="54.082645" strokeWidth=".1076"></tspan></text>
          </g>
          <g transform="matrix(0 -.48768 .49496 0 76.673 154.89)">
          <g transform="translate(-10.958 10.958)" fillRule="evenodd" stroke="#000" strokeLinejoin="round" strokeWidth=".347">
            <path transform="translate(-.26727 .26727)" d="m227.78 46.734c-0.98862-3.7237 3.1879-4.7808 4.9593-8.079 1.7714-3.2983 1.4545-9.428 5.3512-10.289 3.8967-0.86062 4.0856 3.7666 7.5138 5.6031 3.4281 1.8365 8.5354 3.4152 9.9154 7.1079 1.38 3.6927-3.8202 5.5-6.3174 8.6276-2.4972 3.1275-0.10522 7.3752-3.8361 8.4953s-7.0265-4.6052-10.469-6.4641c-3.4426-1.8589-6.1284-1.2785-7.117-5.0021z" fill="#59f"/>
            <path d="m235.71 35.42c0.71688-1.0108 2.0468-1.5649 3.2507-1.5409 1.2039 0.02402 2.6361 0.27067 3.3168 1.394 0.68071 1.1234-0.0123 2.3563-0.72132 3.3752-0.70901 1.0189-1.2883 1.2956-2.4767 1.5091s-1.9735-0.4772-2.4921-1.5698c-0.51856-1.0926-1.5943-2.1569-0.87738-3.1677z" fill="#acf"/>
          </g>
          </g>
          <g transform="matrix(.47677 0 0 .45661 2.8557 21.56)" fillRule="evenodd" stroke="#000" strokeLinejoin="round">
          <rect x="239.54" y="43.601" width="11.99" height="29.807" ry="5.9952" fill="#d7d7f4" strokeWidth=".265"/>
          <rect x="243.48" y="35.948" width="4.275" height="8.0131" fill="#fff6d5" strokeWidth=".266"/>
          </g>
          <g transform="matrix(.39514 0 0 .44113 5.8447 22.323)">
          <g transform="translate(94.77 43.261)">
            <g stroke="#000">
            <ellipse cx="45.924" cy="22.868" rx="15.497" ry="7.5595" fill="#ff8080" fillRule="evenodd" strokeLinejoin="round" strokeWidth=".347"/>
            <ellipse cx="45.735" cy="18.332" rx="15.497" ry="7.5595" fill="#ff8080" fillRule="evenodd" strokeLinejoin="round" strokeWidth=".347"/>
            <path d="m30.201 18.108 0.16704 4.9779" fill="none" strokeWidth=".26458px"/>
            <path d="m61.205 17.807 0.33409 5.0447" fill="none" strokeWidth=".26458px"/>
            <path transform="scale(.26458)" d="m115.1 80.306c-3e-3 -0.59669-0.0388-1.8752-0.0796-2.8411l-0.0743-1.7562 0.43907 0.83263c0.24149 0.45795 0.5882 1.0689 0.77047 1.3576l0.33139 0.52497-0.40025 0.78898c-0.22014 0.43394-0.53102 1.1015-0.69085 1.4835l-0.29061 0.69448z" fill="#ff8080" fillRule="evenodd" strokeLinejoin="round" strokeWidth=".1656"/>
            </g>
            <path transform="scale(.26458)" d="m231.45 80.044c-0.0478-0.16149-0.40067-0.85394-0.78423-1.5388l-0.69739-1.2452 0.57245-1.2171c0.31485-0.6694 0.60125-1.3023 0.63646-1.4065 0.0352-0.10417 0.0705 0.0095 0.0785 0.25254 8e-3 0.24307 0.0936 1.5493 0.19029 2.9027 0.0967 1.3534 0.15671 2.4799 0.13332 2.5033-0.0234 0.02339-0.0816-0.0896-0.12936-0.2511z" fill="#ff8080" fillRule="evenodd"/>
          </g>
          <text transform="scale(1.038 .96343)" x="126.74339" y="66.334862" fill="#ffd5d5" fontFamily="sans-serif" fontSize="7.3752px" strokeWidth=".18438"><tspan x="126.74339" y="66.334862" fill="#ffd5d5" strokeWidth=".18438"></tspan></text>
          <g fill="#d35f5f" fillRule="evenodd">
            <path transform="matrix(.26458 0 0 .26458 0 33.928)" d="m527.76 149.43c-21.892-0.7904-41.259-7.5836-49.556-17.383-4.0397-4.7706-5.2578-10.758-3.1618-15.541l0.58324-1.3308 1.0836 1.2943c2.5528 3.049 7.4078 6.4601 12.985 9.123 8.7378 4.172 18.663 6.7066 30.869 7.883 4.2327 0.40796 16.728 0.40796 20.961 0 12.181-1.1741 22.266-3.7466 30.869-7.8745 6.6726-3.2017 11.845-7.1404 14.503-11.044 0.38128-0.56003 0.40149-0.54032 1.1652 1.1364 1.3342 2.9291 1.724 5.2347 1.3163 7.7865-0.60858 3.8095-2.5213 7.152-6.0214 10.522-9 8.6661-26.023 14.321-46.172 15.337-2.7519 0.13878-5.5717 0.23131-6.2662 0.20564-0.69448-0.0257-2.115-0.0775-3.1567-0.11507z"/>
            <path transform="matrix(.26458 0 0 .26458 0 33.928)" d="m473.38 114c-0.0359-1.0524-0.0497-1.9925-0.0307-2.089 0.0247-0.12558 0.15431 0.0404 0.45558 0.58343 0.23156 0.41741 0.48444 0.85937 0.56196 0.98214 0.13535 0.21438 0.11989 0.26706-0.39035 1.3301l-0.53129 1.1068z"/>
            <path transform="matrix(.26458 0 0 .26458 0 33.928)" d="m589.47 114.86c-0.10901-0.22684-0.43828-0.8429-0.7317-1.369l-0.5335-0.95656 0.57192-1.2251c0.31456-0.67381 0.59015-1.1675 0.61241-1.097 0.0521 0.16482 0.34899 5 0.30912 5.0343-0.0165 0.0142-0.11924-0.15976-0.22825-0.38661z"/>
          </g>
          </g>
          <g transform="matrix(.46703 0 0 .44347 81.541 23.258)" fillRule="evenodd" stroke="#000" strokeLinejoin="round" strokeWidth=".347">
          <path d="m102.38 61.462c0.39751-3.2526-1e-3 -7.038 1.5764-9.64 1.8216-3.0039 4.9383-4.102 7.9542-6.2623 2.6124-1.8713 6.419-1.3892 9.6434-1.6114 3.7225-0.25654 6.4919 0.63452 9.6696 2.6942 2.7525 1.7841-0.0286 4.4023 1.3959 7.3901 1.6445 3.4493 5.8573 6.7297 5.8812 10.478 0.0208 3.2471-4.2936 2.7-5.5945 5.4612-1.5019 3.1878-0.23408 6.0477-3.407 7.5966-2.7483 1.3417-5.8388-0.01753-8.95-0.08741-3.5917-0.08068-7.4778 0.41889-10.896-1.2394-2.9606-1.4364-2.0969-4.4701-3.4179-7.2219-1.5251-3.1769-4.3146-3.803-3.8556-7.5581z" fill="#59f"/>
          <path d="m120.89 47.617c2.9186-1.2563 6.2152-0.60844 8.9529 0.6309 1.3852 0.62704 1.7221 2.4466 1.3923 3.8911-0.65187 2.855-1.9643 4.9756-4.6154 6.7584-1.3413 0.90201-3.0198 0.93044-4.291 0.0074-2.5125-1.8244-3.7911-4.7532-3.7685-7.8603 0.0114-1.572 0.85309-2.7918 2.3297-3.4274z" fill="#acf"/>
          </g>
          <g transform="matrix(.56635 0 0 .58818 125.63 15.037)">
          <g transform="translate(0 -.80181)" fillRule="evenodd" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".2">
            <rect x="57.196" y="46.505" width="17.239" height="26.727" rx="1.2027" ry="3.8754" fill="#f4e3d7"/>
            <rect x="62.909" y="38.019" width="5.1449" height="8.3522" rx="1.2027" ry="3.8754" fill="#c8beb7"/>
          </g>
          <rect x="59.267" y="52.986" width="13.096" height="6.1472" fill="#ececec" fillRule="evenodd" stroke="#000" strokeLinejoin="round" strokeWidth=".165"/>
          <text transform="scale(.93751 1.0667)" x="63.47168" y="54.082645" fill="#000000" fontFamily="sans-serif" fontSize="4.304px" strokeWidth=".1076"><tspan x="63.47168" y="54.082645" strokeWidth=".1076"></tspan></text>
          </g>
          <g transform="matrix(.39514 0 0 .44113 122.96 12.634)">
          <g transform="translate(94.77 43.261)">
            <g stroke="#000">
            <ellipse cx="45.924" cy="22.868" rx="15.497" ry="7.5595" fill="#ff8080" fillRule="evenodd" strokeLinejoin="round" strokeWidth=".347"/>
            <ellipse cx="45.735" cy="18.332" rx="15.497" ry="7.5595" fill="#ff8080" fillRule="evenodd" strokeLinejoin="round" strokeWidth=".347"/>
            <path d="m30.201 18.108 0.16704 4.9779" fill="none" strokeWidth=".26458px"/>
            <path d="m61.205 17.807 0.33409 5.0447" fill="none" strokeWidth=".26458px"/>
            <path transform="scale(.26458)" d="m115.1 80.306c-3e-3 -0.59669-0.0388-1.8752-0.0796-2.8411l-0.0743-1.7562 0.43907 0.83263c0.24149 0.45795 0.5882 1.0689 0.77047 1.3576l0.33139 0.52497-0.40025 0.78898c-0.22014 0.43394-0.53102 1.1015-0.69085 1.4835l-0.29061 0.69448z" fill="#ff8080" fillRule="evenodd" strokeLinejoin="round" strokeWidth=".1656"/>
            </g>
            <path transform="scale(.26458)" d="m231.45 80.044c-0.0478-0.16149-0.40067-0.85394-0.78423-1.5388l-0.69739-1.2452 0.57245-1.2171c0.31485-0.6694 0.60125-1.3023 0.63646-1.4065 0.0352-0.10417 0.0705 0.0095 0.0785 0.25254 8e-3 0.24307 0.0936 1.5493 0.19029 2.9027 0.0967 1.3534 0.15671 2.4799 0.13332 2.5033-0.0234 0.02339-0.0816-0.0896-0.12936-0.2511z" fill="#ff8080" fillRule="evenodd"/>
          </g>
          <text transform="scale(1.038 .96343)" x="126.74339" y="66.334862" fill="#ffd5d5" fontFamily="sans-serif" fontSize="7.3752px" strokeWidth=".18438"><tspan x="126.74339" y="66.334862" fill="#ffd5d5" strokeWidth=".18438"></tspan></text>
          <g fill="#d35f5f" fillRule="evenodd">
            <path transform="matrix(.26458 0 0 .26458 0 33.928)" d="m527.76 149.43c-21.892-0.7904-41.259-7.5836-49.556-17.383-4.0397-4.7706-5.2578-10.758-3.1618-15.541l0.58324-1.3308 1.0836 1.2943c2.5528 3.049 7.4078 6.4601 12.985 9.123 8.7378 4.172 18.663 6.7066 30.869 7.883 4.2327 0.40796 16.728 0.40796 20.961 0 12.181-1.1741 22.266-3.7466 30.869-7.8745 6.6726-3.2017 11.845-7.1404 14.503-11.044 0.38128-0.56003 0.40149-0.54032 1.1652 1.1364 1.3342 2.9291 1.724 5.2347 1.3163 7.7865-0.60858 3.8095-2.5213 7.152-6.0214 10.522-9 8.6661-26.023 14.321-46.172 15.337-2.7519 0.13878-5.5717 0.23131-6.2662 0.20564-0.69448-0.0257-2.115-0.0775-3.1567-0.11507z"/>
            <path transform="matrix(.26458 0 0 .26458 0 33.928)" d="m473.38 114c-0.0359-1.0524-0.0497-1.9925-0.0307-2.089 0.0247-0.12558 0.15431 0.0404 0.45558 0.58343 0.23156 0.41741 0.48444 0.85937 0.56196 0.98214 0.13535 0.21438 0.11989 0.26706-0.39035 1.3301l-0.53129 1.1068z"/>
            <path transform="matrix(.26458 0 0 .26458 0 33.928)" d="m589.47 114.86c-0.10901-0.22684-0.43828-0.8429-0.7317-1.369l-0.5335-0.95656 0.57192-1.2251c0.31456-0.67381 0.59015-1.1675 0.61241-1.097 0.0521 0.16482 0.34899 5 0.30912 5.0343-0.0165 0.0142-0.11924-0.15976-0.22825-0.38661z"/>
          </g>
          </g>
          <g transform="matrix(.49078 0 0 .46555 67.156 32.61)" fillRule="evenodd" stroke="#000" strokeLinejoin="round" strokeWidth=".347">
          <path d="m232.39 52.582c-2.7739-3.2875-2.7764-6.2115-1.1295-10.3 1.6469-4.0883 2.8142-9.2244 6.6092-10.731s6.0507 2.9549 9.3078 5.4704 5.9833 6.6824 5.3466 11.053c-0.63678 4.3707-4.357 5.442-8.5328 6.8237-4.1758 1.3817-8.8274 0.97135-11.601-2.3161z" fill="#59f"/>
          <path d="m235.71 35.42c0.71688-1.0108 2.0468-1.5649 3.2507-1.5409 1.2039 0.02402 2.6361 0.27067 3.3168 1.394 0.68071 1.1234-0.0123 2.3563-0.72132 3.3752-0.70901 1.0189-1.2883 1.2956-2.4767 1.5091s-1.9735-0.4772-2.4921-1.5698c-0.51856-1.0926-1.5943-2.1569-0.87738-3.1677z" fill="#acf"/>
          </g>
          <g transform="matrix(.47677 0 0 .45661 89.268 19.54)">
          <g transform="translate(-8.9694 .28956)" fillRule="evenodd" stroke="#000" strokeLinejoin="round">
            <rect x="239.54" y="43.601" width="11.99" height="29.807" ry="5.9952" fill="#d7d7f4" strokeWidth=".265"/>
            <rect x="243.48" y="35.948" width="4.275" height="8.0131" fill="#fff6d5" strokeWidth=".266"/>
          </g>
          </g>
          <g transform="matrix(.57673 0 0 .58846 163.49 29.79)" fillRule="evenodd" stroke="#000" strokeLinejoin="round" strokeWidth=".347">
          <path d="m111.23 19.74c1.401 4.6142 0.37061 8.1346-2.1204 12.455-2.491 4.3204-7.021 6.6319-11.511 5.3382-4.4898-1.2938-7.9586-4.004-9.8867-8.3418-1.928-4.3378-0.74207-10.72 1.7119-14.728 2.454-4.0086 8.0746-1.8132 12.899-1.008 4.8248 0.80516 7.5055 1.6705 8.9066 6.2848z" fill="#59f"/>
          <path d="m91.351 14.594c0.90086-0.93514 1.8128-0.93921 3.2087-0.83482 1.4541 0.10874 2.8659 1.2074 3.2438 2.4996 0.36278 1.2404 0.06187 2.4491-0.8753 3.4789-0.97628 1.0727-2.4971 1.6018-3.947 1.4263-1.3919-0.16848-1.9342-1.4926-2.3327-2.7424-0.41515-1.302-0.23596-2.8535 0.70248-3.8276z" fill="#acf"/>
          </g>
          <g transform="matrix(0 -.48768 .49496 0 211.7 165.21)">
          <g transform="translate(-10.958 10.958)" fillRule="evenodd" stroke="#000" strokeLinejoin="round" strokeWidth=".347">
            <path transform="translate(-.26727 .26727)" d="m227.78 46.734c-0.98862-3.7237 3.1879-4.7808 4.9593-8.079 1.7714-3.2983 1.4545-9.428 5.3512-10.289 3.8967-0.86062 4.0856 3.7666 7.5138 5.6031 3.4281 1.8365 8.5354 3.4152 9.9154 7.1079 1.38 3.6927-3.8202 5.5-6.3174 8.6276-2.4972 3.1275-0.10522 7.3752-3.8361 8.4953s-7.0265-4.6052-10.469-6.4641c-3.4426-1.8589-6.1284-1.2785-7.117-5.0021z" fill="#59f"/>
            <path d="m235.71 35.42c0.71688-1.0108 2.0468-1.5649 3.2507-1.5409 1.2039 0.02402 2.6361 0.27067 3.3168 1.394 0.68071 1.1234-0.0123 2.3563-0.72132 3.3752-0.70901 1.0189-1.2883 1.2956-2.4767 1.5091s-1.9735-0.4772-2.4921-1.5698c-0.51856-1.0926-1.5943-2.1569-0.87738-3.1677z" fill="#acf"/>
          </g>
          </g>
          <g transform="matrix(.55095 0 0 .64174 226.75 8.1017)" fillRule="evenodd">
          <rect x="16.82" y="47.908" width="12.095" height="3.4963" fill="#fea" stroke="#000" strokeLinejoin="round" strokeWidth=".2"/>
          <g fill="#f4eed7">
            <rect x="16.82" y="51.405" width="47.436" height="1.3229" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".2"/>
            <rect x="35.246" y="52.728" width="29.01" height="1.4174" stroke="#000" strokeLinejoin="round" strokeWidth=".2"/>
            <rect x="35.341" y="52.279" width="28.821" height="1.1812"/>
          </g>
          </g>
        </g>
      </svg>
    </>
  );
}

function Ground({id})
{
  const [x, setX] = React.useState(0);
  const [context, setContext] = React.useContext(Engine.getContext());
  let offset = 0;
  const speed = 0.4;
  let fixedUpdateLoopId;

  React.useEffect(() => {
    context[id] = {
      'tag': 'obstacle'
    };
    setContext({...context});
  }, []);

  // React.useEffect(() => {
  //   function fixedUpdateLoop()
  //   {
  //     let change = (x - (speed * Engine.getTime().getTimeScale()));

  //     if (x < -200)
  //     {
  //       offset = offset - 200;
  //       change = 0;
  //     }

  //     setX(change);

  //     fixedUpdateLoopId = Engine.fixedUpdate(fixedUpdateLoop);
  //   }

  //   fixedUpdateLoopId = Engine.fixedUpdate(fixedUpdateLoop);

  //   return () => Engine.cancelFixedUpdate(fixedUpdateLoopId);
  // }, [x]);

  return(
    <>
      <style jsx>{`
        // .groundImageContainer
        // {
        //   height: 100%;
        //   width: ${2*200}vh;
        //   background: #f4d7d7;
        //   transform: translate3d(0vh, 79.66vh, -1px);
        // }

        // .groundImage
        // {
        //   height: 100%;
        //   width: 200vh;
        //   will-change: transform;
        // }

        .groundImageContainer
        {
          height: 1vh;
          width: 100vh;
          transform: translate3d(0vh, 100vh, -1px);
        }
      `}</style>
      <div id={id} className="groundImageContainer">
        {/* <GroundImage className="groundImage" style={{transform: `translate3d(${offset + x}vh, 0, -2px)`}} />
        <GroundImage className="groundImage" style={{transform: `translate3d(${offset + x+(speed*2)}vh, 0, -3px)`}} /> */}
      </div>
    </>
  );
}

export default function Pipes()
{
  const offset = 50;
  const spacing = 120;
  const numberOfPipes = 6;
  const min = 30;
  const max = 90;
  const speed = 0.4;

  let items = [];
  for (let i = 0; i < numberOfPipes; i++)
  {
    items.push(
      <PipeSet
        key={i}
        index={i}
        offset={offset}
        spacing={spacing}
        numberOfPipes={numberOfPipes}
        min={min}
        max={max}
        speed={speed}
      />
    );
  }

  const styleRoot = {

  };

  return (
    <>
      <span style={styleRoot}>
        {items}
      </span>
      <Ground id={'slapId_background_0'} />
    </>
  );
}
