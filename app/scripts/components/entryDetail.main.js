// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'

class EntryDetail extends Component {
	constructor(props){
		super(props);
	}
	render () {

		// Debug
		this.props.debug ? console.info(`DEBUG: Rendering Entry Detail`) : '';

		return (
			<div className={'entry-detail'}>
				<strong className={'entry-name'}>Bringham And Womans Hospital</strong>
				<span className={'entry-street'}>1 Deaconess Rd</span>
				<span className={'entry-city-state-zip'}>Boston, MA 02215</span>
				<a href={'tel:8888888888'} className={'entry-phone'}>240-893-4616</a>
				<a href={'http://www.bidmc.org'} className={'entry-website'}>http://www.bidmc.org</a>
				<h2>HCPs at this location</h2>
				<ul>
					<li>
						<strong className={'doctor-name'}>Donald Cutlip, MD</strong>
						<span className={'title'}>Interventional Cardiologist</span>
					</li>
					<li>
						<strong className={'doctor-name'}>Jeffrey Popma, MD</strong>
						<span className={'title'}>Interventional Cardiologist</span>
					</li>
					<li>
						<strong className={'doctor-name'}>Kamal Khabbaz, MD</strong>
						<span className={'title'}>Cardiac Surgeon</span>
					</li>
				</ul>

				<div className={'more-info'}>
					<h2>Email or print this information</h2>
					<input type={'email'} placeholder={'Enter Email Address'} />
					<input type={'submit'} id={'email'} value={'Email'}/>
					<input type={'submit'} id={'print'} value={'Print'}/>
				</div>

			</div>
		)
	}
}

export { EntryDetail }