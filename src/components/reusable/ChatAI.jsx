import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiCpu } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { sendMessage } from '../../lib/gemini';

const ChatAI = () => {
	const [inputValue, setInputValue] = useState('');
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSendMessage = async () => {
		if (!inputValue.trim() || isLoading) return;

		const userMessage = inputValue;
		setInputValue('');
		
		const newHistory = [
			...messages,
			{ role: 'user', parts: [{ text: userMessage }] }
		];
		setMessages(newHistory);
		setIsLoading(true);

		try {
			const response = await sendMessage(messages, userMessage);
			setMessages([
				...newHistory,
				{ role: 'model', parts: [{ text: response }] }
			]);
		} catch (error) {
			console.error("Error sending message:", error);
			setMessages([
				...newHistory,
				{ role: 'model', parts: [{ text: "Sorry, I encountered an issue while processing your request. Please try again in a moment." }] }
			]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSendMessage();
		}
	};

	return (
		<div className="w-full max-w-4xl mx-auto my-10 p-4 sm:p-6 bg-secondary-light dark:bg-ternary-dark rounded-xl shadow-lg border border-primary-light dark:border-secondary-dark">
			<div className="text-center mb-8">
				<h2 className="text-2xl sm:text-3xl font-semibold text-primary-dark dark:text-primary-light mb-2">
					Chat with Ivan's AI
				</h2>
				<p className="text-ternary-dark dark:text-ternary-light text-sm sm:text-base">
					Ask questions about Ivan’s experience, skills, and projects.
				</p>
			</div>

			<div className="bg-white dark:bg-primary-dark rounded-lg p-4 h-96 overflow-y-auto mb-6 border border-gray-200 dark:border-gray-700 flex flex-col gap-4">
				{messages.length === 0 ? (
					<div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 text-center px-4">
						<FiCpu className="text-5xl mb-4 opacity-20" />
						<p>
							Hi! Try asking something like:<br/>
							"What are Ivan's main skills?" or "Tell me about his experience at Agropalma."
						</p>
					</div>
				) : (
					messages.map((msg, index) => (
						<div 
							key={index} 
							className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
						>
							<div className={`flex max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
								<div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-500' : 'bg-green-500'} text-white`}>
									{msg.role === 'user' ? <FiUser /> : <FiCpu />}
								</div>
								<div className={`p-3 rounded-2xl text-sm sm:text-base ${
									msg.role === 'user' 
									? 'bg-indigo-500 text-white rounded-tr-none' 
									: 'bg-gray-100 dark:bg-ternary-dark text-primary-dark dark:text-primary-light rounded-tl-none'
								}`}>
									<ReactMarkdown className="prose dark:prose-invert max-w-none">
										{msg.parts[0].text}
									</ReactMarkdown>
								</div>
							</div>
						</div>
					))
				)}
				{isLoading && (
					<div className="flex justify-start gap-3 animate-pulse">
						<div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
							<FiCpu />
						</div>
						<div className="p-3 rounded-2xl bg-gray-100 dark:bg-ternary-dark rounded-tl-none h-10 w-20"></div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			<div className="relative flex items-center">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyPress}
					placeholder="Type your question..."
					className="w-full p-4 pr-20 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-primary-dark text-primary-dark dark:text-primary-light focus:outline-none focus:ring-2 focus:ring-indigo-500 duration-300 shadow-sm"
				/>
				<button
					onClick={handleSendMessage}
					disabled={isLoading || !inputValue.trim()}
					className={`absolute right-2 p-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 duration-300 transition-colors ${
						(isLoading || !inputValue.trim()) ? 'opacity-50 cursor-not-allowed' : ''
					}`}
				>
					<FiSend className="text-xl" />
				</button>
			</div>
		</div>
	);
};

export default ChatAI;