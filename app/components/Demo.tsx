/**
 * Demo component that displays static placeholder content
 */
const Demo = () => {
  const staticFeatures = [
    {
      id: 1,
      title: 'Quick Loan Approval',
      description: 'Get your loan approved within minutes with our streamlined digital process.',
      icon: '⚡',
    },
    {
      id: 2,
      title: 'Competitive Rates',
      description: 'Enjoy some of the most competitive interest rates in the market.',
      icon: '📊',
    },
    {
      id: 3,
      title: 'Flexible Repayment',
      description: 'Choose from various repayment options that suit your financial needs.',
      icon: '🔄',
    },
    {
      id: 4,
      title: 'Secure & Trusted',
      description: 'Your data is protected with bank-grade security measures.',
      icon: '🔒',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Why Choose WeCredit?
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover how we make financial solutions simple, fast, and accessible for everyone
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staticFeatures.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          🚧 Blog posts coming soon — stay tuned for financial insights and guides!
        </p>
      </div>
    </div>
  );
};

export default Demo;