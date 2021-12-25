import './style.scss'

function TitlePage(props) {
  const { title, image } = props
  return (
    <div className="page__top" style={{ backgroundImage: `url("${image}")` }}>
      <h2>{title}</h2>
    </div>
  )
}

export default TitlePage
