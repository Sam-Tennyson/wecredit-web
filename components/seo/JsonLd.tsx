/**
 * JSON-LD structured data component
 */

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders JSON-LD structured data script
 */
const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLd;

