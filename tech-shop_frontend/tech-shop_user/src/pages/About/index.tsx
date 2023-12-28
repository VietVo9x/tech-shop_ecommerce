import PageHero from '../../components/PageHero';
import './style.scss';
export default function About() {
  return (
    <div>
      <PageHero title="About" />
      <div className="about">
        <h1>ABOUT</h1>
      </div>
    </div>
  );
}
