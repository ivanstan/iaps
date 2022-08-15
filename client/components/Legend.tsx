import React from "react";

class Legend extends React.Component<any, any> {

  public state = {
    data: [],
    width: 300,
    gradient: [],
  }

  private legend: any = null;

  componentDidMount() {
    const { gradient } = this.props

    let colors =  [...gradient]
    colors.splice(0,1)

    this.setState({
      gradient: colors,
      width: this.legend.clientWidth
    })
  }

  render() {
    const { width, gradient } = this.state;
    const { maxIntensity, step } = this.props;

    let data = [];
    for (let i = 0; i <= maxIntensity; i += step || 5) {
      let offset = i * width / maxIntensity;
      if (i > 0 && i < maxIntensity) {
        offset -= 0.5;
      } else if (i === maxIntensity) {
        offset -= 1;
      }

      data.push({
        title: i,
        offset: offset
      });
    }

    let gradientCss = '(to right';
    for (let i = 0; i < gradient.length; ++i) {
      gradientCss += ', ' + gradient[i];
    }
    gradientCss += ')';

    const gradientStyle: any = {
      height: 10,
      width: '100%',
      background: 'linear-gradient' + gradientCss,
      position: 'relative'
    };

    return <div style={{ height: 30, marginTop: 10 }}>
      <div style={gradientStyle} ref={(ref) => this.legend = ref}>
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
    </div>
  }

}

export default Legend;
