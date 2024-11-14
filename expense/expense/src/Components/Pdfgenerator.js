import jsPDF from "jspdf";
import "./pdfStyles.css"; // Import the CSS file

const PDFGenerator = ({ expenses, totalExpenses, remaining }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title with proper styling

    let html = `
     
      <h1>Transaction Reports</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Remaining Amount</th>
          </tr>
        </thead>
        <tbody>
    `;

    expenses.forEach((expense) => {
      html += `
        <tr>
          <td>${expense.title}</td>
          <td>$${parseFloat(expense.amount).toFixed(2)}</td>
          <td>${expense.date}</td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
      <div class="total">Total Expenses: $${totalExpenses.toFixed(2)}</div>
      <div class="total">Remaining Amount: $${remaining.toFixed(2)}</div>
    `;

    doc.html(html, {
      callback: function (doc) {
        const pdfOutput = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfOutput);
        const newTab = window.open();
        newTab.location.href = pdfUrl;
      },
      x: 10,
      y: 10,
      width: 410,
      autoPaging: "text",
    });
  };

  return (
    <button className="btn pdf-btn" onClick={generatePDF}>
      Show PDF Report
    </button>
  );
};

export default PDFGenerator;
