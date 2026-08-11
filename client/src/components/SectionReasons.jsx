function SectionReasons({ sectionReasons }) {
  return (
    <div className="section-reasons">
      <h3>🔍 Why You Got This Score</h3>

      {Object.entries(sectionReasons || {}).map(
        ([section, reason]) => (
          <div className="reason-card" key={section}>
            <h4>
              {section.charAt(0).toUpperCase() +
                section.slice(1)}
            </h4>

            {reason.found?.length > 0 && (
              <div>
                <strong>✅ Found</strong>

                <ul>
                  {reason.found.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {reason.missing?.length > 0 && (
              <div>
                <strong>❌ Missing</strong>

                <ul>
                  {reason.missing.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {reason.message && (
              <p>
                <strong>💡 Reason:</strong>{" "}
                {reason.message}
              </p>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default SectionReasons;