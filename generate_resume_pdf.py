import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import black, HexColor
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def create_resume(output_path):
    # Total width of letter is 612pt. Margin 36 on each side leaves 540pt content width.
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=30
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'NameTitle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=20,
        leading=22,
        alignment=TA_CENTER,
        textColor=HexColor('#111111')
    )

    sub_title_style = ParagraphStyle(
        'SubTitle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=11,
        leading=14,
        alignment=TA_CENTER,
        textColor=HexColor('#222222')
    )

    contact_style = ParagraphStyle(
        'Contact',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.5,
        leading=13,
        alignment=TA_CENTER,
        textColor=HexColor('#111111')
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=11,
        leading=13,
        textColor=HexColor('#000000')
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.2,
        leading=12.2,
        alignment=TA_JUSTIFY,
        textColor=HexColor('#111111')
    )

    item_title_left = ParagraphStyle(
        'ItemTitleLeft',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9.5,
        leading=12.5,
        alignment=TA_LEFT,
        textColor=HexColor('#111111')
    )

    item_title_right = ParagraphStyle(
        'ItemTitleRight',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9.5,
        leading=12.5,
        alignment=TA_RIGHT,
        textColor=HexColor('#111111')
    )

    item_sub_left = ParagraphStyle(
        'ItemSubLeft',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=9,
        leading=11.8,
        alignment=TA_LEFT,
        textColor=HexColor('#222222')
    )

    item_sub_right = ParagraphStyle(
        'ItemSubRight',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=9,
        leading=11.8,
        alignment=TA_RIGHT,
        textColor=HexColor('#222222')
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.1,
        leading=11.8,
        alignment=TA_JUSTIFY,
        leftIndent=12,
        firstLineIndent=-10,
        textColor=HexColor('#111111')
    )

    def section_header(title):
        return [
            Spacer(1, 6),
            Paragraph(title, section_heading),
            HRFlowable(width="100%", thickness=0.75, color=black, spaceBefore=2, spaceAfter=4)
        ]

    def two_col_row(left_p, right_p, left_w=270, right_w=270):
        t = Table([[left_p, right_p]], colWidths=[left_w, right_w])
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'BOTTOM'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ]))
        return t

    story = []

    # Header
    story.append(Paragraph("AYUSHMAN SINHA", title_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("Sophomore", sub_title_style))
    story.append(Spacer(1, 2.5))
    story.append(Paragraph("&#9742; +91-9123306209 &nbsp;&nbsp;&nbsp;&#9993; sinhaayushman09@gmail.com &nbsp;&nbsp;&nbsp;<b>in</b> linkedin.com/in/ayushmansinha10", contact_style))

    # Summary
    story.extend(section_header("Summary"))
    story.append(Paragraph(
        "Sophomore Data Science enthusiast with a strong foundation in Python, statistics, and data analysis. Hands-on experience with machine learning basics, data preprocessing, visualization, and model building. Actively seeking opportunities to apply AI/ML techniques to real-world datasets and industry problems.",
        body_style
    ))

    # Skills
    story.extend(section_header("Skills"))
    story.append(Paragraph("<b>Programming &amp; Querying:</b> SQL, Python, HTML5, CSS, C Programming.", body_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("<b>Developer &amp; Data Tools:</b> Advanced MS Excel, Power BI, Tableau, VS Code, Firebase Studio, n8n, Git, GitHub.", body_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("<b>AI &amp; Productivity Tools:</b> Cursor, Blackbox, Lovable, Claude, Hugging Face, Ollama, LM Studio.", body_style))

    # Experience
    story.extend(section_header("Experience"))
    story.append(two_col_row(
        Paragraph("Data Science Intern", item_title_left),
        Paragraph("February 2026 – March 2026", item_title_right),
        340, 200
    ))
    story.append(two_col_row(
        Paragraph("Data Science (Remote)", item_sub_left),
        Paragraph("Tools Used: Python, Jupyter Notebook, Git &amp; GitHub", item_sub_right),
        200, 340
    ))
    story.append(Spacer(1, 2))
    story.append(Paragraph("–&nbsp;&nbsp;Analyzed and cleaned large-scale unemployment datasets using Python (Pandas, NumPy), uncovering long-term and seasonal trends across regions and time periods to support socio-economic analysis.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("–&nbsp;&nbsp;Conducted exploratory data analysis and visualized Covid-19’s impact on unemployment rates using Matplotlib and Seaborn, translating complex trends into clear, policy-relevant insights.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("–&nbsp;&nbsp;Built and evaluated regression models to predict car prices based on features such as brand, mileage, horsepower, and engine capacity, improving price estimation accuracy through feature engineering and model tuning.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("–&nbsp;&nbsp;Collaborated with cross-functional stakeholders to interpret analytical results and deliver actionable insights, enabling data-driven decision-making for economic analysis and business strategy.", bullet_style))

    # Projects
    story.extend(section_header("Projects"))
    story.append(two_col_row(
        Paragraph("<b>Agentic Honey-Pot for Scam Detection &amp; Intelligence Extraction</b> | <i>Python</i>", item_title_left),
        Paragraph("November 2025 – December 2025", item_title_right),
        370, 170
    ))
    story.append(Spacer(1, 2))
    story.append(Paragraph("–&nbsp;&nbsp;Designed and implemented an agentic honey-pot system for scam detection using LLMs and NLP techniques to identify fraudulent intent across banking fraud, UPI scams, phishing, and fake offers.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("–&nbsp;&nbsp;Built an autonomous AI agent powered by prompt engineering and state machine–based conversation control, enabling human-like personas, multi-turn dialogue handling, and adaptive response generation.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("–&nbsp;&nbsp;Extracted, normalized, and returned structured scam intelligence in JSON format, including fraud patterns, scam strategies, and behavioral signals for downstream analysis.", bullet_style))
    
    story.append(Spacer(1, 3.5))
    story.append(two_col_row(
        Paragraph("<b>AI Stock Trend Analyzer</b> | <i>Python, Machine Learning</i>", item_title_left),
        Paragraph("January 2026 – February 2026", item_title_right),
        370, 170
    ))
    story.append(Spacer(1, 2))
    story.append(Paragraph("–&nbsp;&nbsp;Analyzed historical stock price data (open, high, low, close, volume) across multiple companies to identify short-term and long-term market trends.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("–&nbsp;&nbsp;Applied data preprocessing techniques including missing-value handling, normalization, and rolling window feature engineering (moving averages, volatility indicators) to improve trend detection.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("–&nbsp;&nbsp;Built and evaluated machine learning models to classify stock price movements (uptrend/downtrend), achieving improved prediction reliability through feature selection and model tuning.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("–&nbsp;&nbsp;Visualized price trends, technical indicators, and model outputs using Matplotlib to support data-driven trading insights and decision-making.", bullet_style))

    # Certifications
    story.extend(section_header("Certifications"))
    story.append(Paragraph("&bull;&nbsp;&nbsp;<b>Gemini Certified University Student – Google for Education (2025):</b> Completed hands-on training on using Gemini AI tools for academic productivity, research assistance, and responsible AI-powered problem-solving.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("&bull;&nbsp;&nbsp;<b>Google Analytics Certification – 2025:</b> Google Digital Academy (Skillshop).", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("&bull;&nbsp;&nbsp;<b>SQL Skill Up - GeeksforGeeks (2025) –</b> Completed hands-on training in SQL covering database design, complex queries, joins, subqueries, indexing, and real-world data retrieval for analytical use cases.", bullet_style))

    # Education
    story.extend(section_header("Education"))
    story.append(two_col_row(
        Paragraph("<b>B.Tech. Information Technology</b>", item_title_left),
        Paragraph("<b>Undergraduate: 2028</b>", item_title_right),
        370, 170
    ))
    story.append(two_col_row(
        Paragraph("MCKV Institute of Engineering, Howrah (West Bengal)", item_sub_left),
        Paragraph("<b>CGPA: 7.76 / 10</b>", item_title_right),
        370, 170
    ))

    doc.build(story)
    print(f"Generated resume successfully at: {output_path}")

if __name__ == '__main__':
    os.makedirs('public', exist_ok=True)
    create_resume('public/Ayushman_Sinha_Resume.pdf')
    create_resume('public/resume.pdf')
