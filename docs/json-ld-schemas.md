# JSON-LD Structured Data Schemas

This document provides reference examples for JSON-LD structured data that should be used in the `scriptApplicationLdJson` field of the SEO component in Strapi CMS.

## Overview

JSON-LD (JavaScript Object Notation for Linked Data) helps search engines understand the content and context of your pages. Each page type should have appropriate schema markup that matches its actual content.

## Important Guidelines

1. **Match Content to Schema**: The JSON-LD must accurately represent the page content
2. **Use Correct @type**: Choose the most specific schema type for your content
3. **Required Fields**: Include all required properties for the chosen schema type
4. **Area Served**: For financial products in India, always specify the area served

## Credit Card Schemas

### Travel Credit Cards

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Travel Credit Cards",
  "description": "Best travel credit cards in India with airport lounge access, air miles, and travel insurance benefits.",
  "category": "Credit Card",
  "feesAndCommissionsSpecification": "Varies by issuer",
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  },
  "offers": {
    "@type": "AggregateOffer",
    "offerCount": "Multiple",
    "lowPrice": "0",
    "highPrice": "10000",
    "priceCurrency": "INR",
    "description": "Annual fee range"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}
```

### Rewards Credit Cards

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Rewards Credit Cards",
  "description": "Best rewards credit cards in India offering cashback, reward points, and shopping benefits.",
  "category": "Credit Card",
  "feesAndCommissionsSpecification": "Varies by issuer",
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  },
  "offers": {
    "@type": "AggregateOffer",
    "offerCount": "Multiple",
    "lowPrice": "0",
    "highPrice": "5000",
    "priceCurrency": "INR",
    "description": "Annual fee range"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}
```

### Cashback Credit Cards

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Cashback Credit Cards",
  "description": "Best cashback credit cards in India with highest cashback rates on shopping and bill payments.",
  "category": "Credit Card",
  "feesAndCommissionsSpecification": "Varies by issuer",
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  },
  "offers": {
    "@type": "AggregateOffer",
    "offerCount": "Multiple",
    "lowPrice": "0",
    "highPrice": "3000",
    "priceCurrency": "INR",
    "description": "Annual fee range"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}
```

### Fuel Credit Cards

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Fuel Credit Cards",
  "description": "Best fuel credit cards in India with fuel surcharge waiver and cashback on petrol and diesel purchases.",
  "category": "Credit Card",
  "feesAndCommissionsSpecification": "Varies by issuer",
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}
```

## Loan Schemas

### Personal Loans

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Personal Loan",
  "description": "Quick and easy personal loans with flexible repayment options.",
  "category": "Loan",
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  },
  "interestRate": {
    "@type": "QuantitativeValue",
    "minValue": 10,
    "maxValue": 18,
    "unitText": "PERCENT"
  },
  "loanTerm": {
    "@type": "QuantitativeValue",
    "minValue": 12,
    "maxValue": 60,
    "unitText": "MONTH"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}
```

### Business Loans

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Business Loan",
  "description": "Get the best business loans in India. Compare interest rates, eligibility, and apply online for quick approval.",
  "category": "Business Loan",
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  },
  "interestRate": {
    "@type": "QuantitativeValue",
    "minValue": 9,
    "maxValue": 20,
    "unitText": "PERCENT"
  },
  "loanTerm": {
    "@type": "QuantitativeValue",
    "minValue": 12,
    "maxValue": 84,
    "unitText": "MONTH"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}
```

### Home Loans

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Home Loan",
  "description": "Best home loan rates in India. Compare offers from top banks and NBFCs.",
  "category": "Home Loan",
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  },
  "interestRate": {
    "@type": "QuantitativeValue",
    "minValue": 6.5,
    "maxValue": 12,
    "unitText": "PERCENT"
  },
  "loanTerm": {
    "@type": "QuantitativeValue",
    "minValue": 60,
    "maxValue": 360,
    "unitText": "MONTH"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}
```

### Education Loans

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Education Loan",
  "description": "Affordable education loans for students pursuing higher education in India and abroad.",
  "category": "Education Loan",
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  },
  "interestRate": {
    "@type": "QuantitativeValue",
    "minValue": 7.5,
    "maxValue": 15,
    "unitText": "PERCENT"
  },
  "loanTerm": {
    "@type": "QuantitativeValue",
    "minValue": 60,
    "maxValue": 180,
    "unitText": "MONTH"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}
```

### Car Loans

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Car Loan",
  "description": "Get the best car loan rates in India for new and used cars.",
  "category": "Auto Loan",
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  },
  "interestRate": {
    "@type": "QuantitativeValue",
    "minValue": 7,
    "maxValue": 14,
    "unitText": "PERCENT"
  },
  "loanTerm": {
    "@type": "QuantitativeValue",
    "minValue": 12,
    "maxValue": 84,
    "unitText": "MONTH"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}
```

## Insurance Schemas

### Health Insurance

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Health Insurance",
  "description": "Comprehensive health insurance plans with cashless hospitalization and wide network coverage.",
  "category": "Insurance",
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  },
  "offers": {
    "@type": "AggregateOffer",
    "offerCount": "Multiple",
    "lowPrice": "5000",
    "highPrice": "50000",
    "priceCurrency": "INR",
    "description": "Annual premium range"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}
```

### Life Insurance

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Life Insurance",
  "description": "Secure your family's future with term and whole life insurance plans.",
  "category": "Insurance",
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  },
  "offers": {
    "@type": "AggregateOffer",
    "offerCount": "Multiple",
    "lowPrice": "3000",
    "highPrice": "100000",
    "priceCurrency": "INR",
    "description": "Annual premium range"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}
```

## Investment Products

### Mutual Funds

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Mutual Funds",
  "description": "Invest in best mutual funds in India with expert guidance and portfolio management.",
  "category": "Investment",
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}
```

### Fixed Deposits

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Fixed Deposits",
  "description": "Compare FD rates from top banks in India and get guaranteed returns on your investment.",
  "category": "Investment",
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  },
  "interestRate": {
    "@type": "QuantitativeValue",
    "minValue": 3,
    "maxValue": 8,
    "unitText": "PERCENT"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}
```

## Blog and Guide Pages

For blog posts and guide articles, use the Article schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "description": "Brief description of the article",
  "image": "https://www.wecredit.com/path-to-image.jpg",
  "datePublished": "2024-01-01T00:00:00Z",
  "dateModified": "2024-01-01T00:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  }
}
```

## Tools and Calculators

For interactive tools and calculators:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "EMI Calculator",
  "description": "Calculate your loan EMI with our easy-to-use calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "provider": {
    "@type": "Organization",
    "name": "WeCredit",
    "url": "https://www.wecredit.com"
  }
}
```

## How to Use in Strapi

1. Navigate to the page you want to edit in Strapi CMS
2. Scroll to the SEO section
3. In the `scriptApplicationLdJson` field, paste the appropriate JSON from above
4. Customize the values to match your specific page content
5. Ensure all URLs, names, and descriptions are accurate
6. Save and publish

## Validation

After adding JSON-LD to your pages, validate them using:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

## Notes

- The application automatically handles JSON-LD rendering through the `generateJsonLd` function
- If no custom schema is provided, a default schema is generated based on page type
- Custom schemas take precedence over auto-generated ones
- Always test your schema markup after making changes

