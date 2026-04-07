import { useState } from 'react';
import Button from '../reusable/Button';
import FormInput from '../reusable/FormInput';

const ContactForm = () => {
	const [status, setStatus] = useState('');
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	// REPLACE THIS ID WITH YOUR ACTUAL FORMSPREE ID (get it at https://formspree.io)
	const formID = 'xvzvlzgy'; 

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus('Sending...');

		try {
			const response = await fetch(`https://formspree.io/f/${formID}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setStatus('Thanks for your message! I will get back to you soon.');
				setFormData({ name: '', email: '', subject: '', message: '' });
			} else {
				setStatus('Oops! There was a problem. Please try again later.');
			}
		} catch (error) {
			setStatus('Error connecting to the server. Please try again.');
		}
	};

	return (
		<div className="w-full lg:w-1/2">
			<div className="leading-loose">
				<form
					onSubmit={handleSubmit}
					className="max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
				>
					<p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
						Contact Form
					</p>
					<FormInput
						inputLabel="Full Name"
						labelFor="name"
						inputType="text"
						inputId="name"
						inputName="name"
						placeholderText="Your Name"
						ariaLabelName="Name"
						onChange={handleInputChange}
						value={formData.name}
					/>
					<FormInput
						inputLabel="Email"
						labelFor="email"
						inputType="email"
						inputId="email"
						inputName="email"
						placeholderText="Your email"
						ariaLabelName="Email"
						onChange={handleInputChange}
						value={formData.email}
					/>
					<FormInput
						inputLabel="Subject"
						labelFor="subject"
						inputType="text"
						inputId="subject"
						inputName="subject"
						placeholderText="Subject"
						ariaLabelName="Subject"
						onChange={handleInputChange}
						value={formData.subject}
					/>

					<div className="mt-6">
						<label
							className="block text-lg text-primary-dark dark:text-primary-light mb-2"
							htmlFor="message"
						>
							Message
						</label>
						<textarea
							className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
							id="message"
							name="message"
							cols="14"
							rows="6"
							aria-label="Message"
							required
							onChange={handleInputChange}
							value={formData.message}
						></textarea>
					</div>

					<div className="font-general-medium w-40 px-4 py-2.5 text-white text-center font-medium tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
						<Button
							title="Send Message"
							type="submit"
							aria-label="Send Message"
						/>
					</div>

					{status && (
						<p className={`mt-4 text-center font-general-regular ${status.includes('Error') || status.includes('Oops') ? 'text-red-500' : 'text-green-500'}`}>
							{status}
						</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default ContactForm;
