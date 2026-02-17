export const revalidate = 120;

export default function Page() {
  const generatedTime = new Date().toLocaleString();

  return (
    <div style={{ padding: 20 }}>
      <p>ISR Time Example</p>
      <p>Generated at: {generatedTime}</p>
    </div>
  );
}
