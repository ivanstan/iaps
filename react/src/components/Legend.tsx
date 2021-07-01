import React from "react";

class Legend extends React.Component<any, any> {

  private state = {
    data: []
  }

  private legend: any = null;

  componentDidMount() {
    const { maxIntensity } = this.props;

    let width = this.legend.clientWidth;

    let legend = [];
    for (let i = 0; i <= maxIntensity; ++i) {
      let offset = i * width / maxIntensity;
      if (i > 0 && i < maxIntensity) {
        offset -= 0.5;
      } else if (i == maxIntensity) {
        offset -= 1;
      }

      legend.push({
        title: i,
        offset: offset
      });
    }

    this.setState({
      data: legend
    })
  }

  render() {
    const { data } = this.state
    const { gradient } = this.props

    let gradientCss = '(to right';
    for (let i = 0; i < gradient.length; ++i) {
      gradientCss += ', ' + gradient[i];
    }
    gradientCss += ')';

    const gradientStyle = {
      height: 10,
      width: '100%',
      background: 'linear-gradient' + gradientCss,
      position: 'relative'
    };

    return <div style={gradientStyle} ref={(ref) => this.legend = ref}>
      {data.map((item: any, index: number) => (
        <div key={index} style={{
          position: 'absolute',
          left: item.offset,
          top: '15px',
          width: '1px',
          height: '3px',
          background: 'black'
        }}>
          <div style={{
            left: -3,
            position: 'relative',
            top: 5
          }}>{item.title}</div>
        </div>
      ))}
    </div>
  }

}

export default Legend;
