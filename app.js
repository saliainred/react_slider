class CitySlider extends React.Component {
  constructor(props) {
    super(props);
    this.imageParts = 4;    
    this.changeTo = null;
    this.autoTime = 5000;
    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }
  
  componentWillUnmount() {
    window.clearTimeout(this.changeTo);
  }
  
  componentDidMount() {
    this.runAutoChange();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }
  
  runAutoChange() {
    this.changeTo = setTimeout(() => {
      this.changeSlides(1);
      this.runAutoChange();
    }, this.autoTime);
  }
  
  changeSlides(change) {
    window.clearTimeout(this.changeTo);
    const { length } = this.props.slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }
  
  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    return (
      <div className={classNames('slider', { 's--ready': sliderReady })}>
        <p className="slider__top-heading">Travelers</p>
        <div className="slider__slides">
          {this.props.slides.map((slide, index) => (
            <div
              className={classNames('slider__slide', {
                's--active':activeSlide === index, 's--prev': prevSlide === index  })}
              key={slide.city}
              >
              <div className="slider__slide-content">
                <h3 className="slider__slide-subheading">{slide.country || slide.city}</h3>
                <h2 className="slider__slide-heading">
                  {slide.city.split('').map(l => <span>{l}</span>)}
                </h2>
                <p className="slider__slide-readmore">read more</p>
              </div>
              <div className="slider__slide-parts">
                {[...Array(this.imageParts).fill()].map((x, i) => (
                  <div className="slider__slide-part" key={i}>
                    <div className="slider__slide-part-inner"
                      style={{ backgroundImage: `url(${slide.img})` }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="slider__control" onClick={() => this.changeSlides(-1)} />
        <div className="slider__control slider__control--right"
          onClick={() => this.changeSlides(1)} />
      </div>
    );
  }
}

const slides = [
  {
    city: "Tokyo",
    country: "Japan",
    img: "https://docs.google.com/uc?export=download&id=15FqcVuQibdrxcbseeT1voLeCNOqxg5TW",
  },
  {
    city: "Seoul",
    country: "South Korea",
    img: "https://docs.google.com/uc?export=download&id=1K6kZuWK1Zr6CQpBvSlvuZ6hziHH__49G",
  },
  {
    city: "London",
    country: "Great Britain",
    img: "https://docs.google.com/uc?export=download&id=1lijCcfAeihE90f7vcPgT7Hl8G1aocUOC",
  },
  {
    city: "Vienna",
    country: "Austria",
    img: "https://docs.google.com/uc?export=download&id=17y6_tx4GFspBgQ3-OEcUWK2-FJwOiOab"
  },
];

ReactDOM.render(
<CitySlider slides={slides} />,
document.getElementById("root")
);
