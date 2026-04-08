// app/components/ProposalPDF.tsx

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1f2937",
    paddingTop: 40,
    paddingBottom: 40,
  },

  // Header
  header: {
    backgroundColor: "#2563eb",
    padding: "32 40",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  businessName: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
  },
  contractorName: {
    fontSize: 10,
    color: "#bfdbfe",
    marginTop: 4,
  },
  headerDates: {
    alignItems: "flex-end",
  },
  headerDateText: {
    fontSize: 9,
    color: "#bfdbfe",
    marginBottom: 2,
  },
  preparedLabel: {
    fontSize: 8,
    color: "#bfdbfe",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  clientName: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
  },
  clientAddress: {
    fontSize: 9,
    color: "#bfdbfe",
    marginTop: 2,
  },

  // Section
  section: {
    padding: "16 40",
    borderBottom: "1 solid #f3f4f6",
  },
  sectionAlt: {
    padding: "16 40",
    borderBottom: "1 solid #f3f4f6",
    backgroundColor: "#f9fafb",
  },
  sectionBlue: {
    padding: "16 40",
    borderBottom: "1 solid #f3f4f6",
    backgroundColor: "#eff6ff",
  },
  sectionLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionLabelGray: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },

  // Proposal title
  proposalTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#1f2937",
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 10,
    color: "#4b5563",
    lineHeight: 1.6,
  },

  // Scope bullets
  bulletRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 5,
  },
  bulletMark: {
    color: "#2563eb",
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  bulletText: {
    fontSize: 10,
    color: "#374151",
    flex: 1,
    lineHeight: 1.5,
  },

  // Exclusions
  exclusionRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 5,
  },
  exclusionMark: {
    color: "#9ca3af",
    fontSize: 10,
  },
  exclusionText: {
    fontSize: 10,
    color: "#6b7280",
    flex: 1,
  },

  // Table
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1 solid #e5e7eb",
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #f9fafb",
    paddingVertical: 6,
  },
  tableFooter: {
    flexDirection: "row",
    paddingTop: 10,
    marginTop: 4,
  },
  colDescription: { flex: 3, color: "#374151" },
  colQty: { flex: 1, textAlign: "center", color: "#6b7280" },
  colUnit: { flex: 1, textAlign: "right", color: "#6b7280" },
  colTotal: { flex: 1, textAlign: "right" },
  tableHeaderText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#9ca3af",
    textTransform: "uppercase",
  },
  totalLabel: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#1f2937",
    flex: 3,
    textAlign: "right",
    paddingRight: 8,
  },
  totalAmount: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#2563eb",
    flex: 1,
    textAlign: "right",
  },

  // Signatures
  signatureGrid: {
    flexDirection: "row",
    gap: 40,
    marginTop: 20,
    paddingHorizontal: 40,
  },
  signatureBox: { flex: 1 },
  signatureLabel: {
    fontSize: 8,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 24,
  },
  signatureLine: {
    borderTop: "1 solid #d1d5db",
    paddingTop: 4,
  },
  signatureName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#374151",
  },
  signatureSub: {
    fontSize: 8,
    color: "#9ca3af",
    marginTop: 2,
  },

  // Footer CTA
  cta: {
    padding: "24 40",
    backgroundColor: "#f9fafb",
    alignItems: "center",
  },
  ctaText: {
    fontSize: 10,
    color: "#4b5563",
    textAlign: "center",
    lineHeight: 1.6,
    maxWidth: 400,
  },
});

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface Proposal {
  proposalTitle: string;
  executiveSummary: string;
  scopeOfWork: string[];
  whatIsNotIncluded: string[];
  timeline: string;
  whyUs: string;
  callToAction: string;
  lineItems: LineItem[];
  total: number;
  paymentTerms: string;
  validUntil: string;
}

interface ProposalPDFProps {
  proposal: Proposal;
  businessName: string;
  contractorName: string;
  clientName: string;
  clientAddress: string;
}

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2 });

const today = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function ProposalPDF({
  proposal,
  businessName,
  contractorName,
  clientName,
  clientAddress,
}: ProposalPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.businessName}>{businessName}</Text>
              <Text style={styles.contractorName}>{contractorName}</Text>
            </View>
            <View style={styles.headerDates}>
              <Text style={styles.headerDateText}>Date: {today}</Text>
              <Text style={styles.headerDateText}>Valid Until: {proposal.validUntil}</Text>
            </View>
          </View>
          <Text style={styles.preparedLabel}>Prepared For</Text>
          <Text style={styles.clientName}>{clientName}</Text>
          <Text style={styles.clientAddress}>{clientAddress}</Text>
        </View>

        {/* Title + Summary */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.proposalTitle}>{proposal.proposalTitle}</Text>
          <Text style={styles.bodyText}>{proposal.executiveSummary}</Text>
        </View>

        {/* Scope of Work */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionLabel}>Scope of Work</Text>
          {proposal.scopeOfWork.map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bulletMark}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Not Included */}
        <View style={styles.sectionAlt}>
          <Text style={styles.sectionLabelGray}>Not Included in This Proposal</Text>
          {proposal.whatIsNotIncluded.map((item, i) => (
            <View key={i} style={styles.exclusionRow}>
              <Text style={styles.exclusionMark}>—</Text>
              <Text style={styles.exclusionText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Timeline */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionLabel}>Project Timeline</Text>
          <Text style={styles.bodyText}>{proposal.timeline}</Text>
        </View>

        {/* Why Us */}
        <View style={styles.sectionBlue}>
          <Text style={styles.sectionLabel}>Why {businessName}</Text>
          <Text style={styles.bodyText}>{proposal.whyUs}</Text>
        </View>

        {/* Line Items */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionLabel}>Investment Summary</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colDescription]}>Description</Text>
            <Text style={[styles.tableHeaderText, styles.colQty]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.colUnit]}>Unit Price</Text>
            <Text style={[styles.tableHeaderText, styles.colTotal]}>Total</Text>
          </View>
          {proposal.lineItems.map((item, i) => (
            <View key={i} style={styles.tableRow} wrap={false}>
              <Text style={[styles.bodyText, styles.colDescription]}>{item.description}</Text>
              <Text style={[styles.bodyText, styles.colQty]}>{item.quantity}</Text>
              <Text style={[styles.bodyText, styles.colUnit]}>${fmt(item.unitPrice)}</Text>
              <Text style={[styles.bodyText, styles.colTotal, { textAlign: "right", fontFamily: "Helvetica-Bold", color: "#1f2937" }]}>
                ${fmt(item.lineTotal)}
              </Text>
            </View>
          ))}
          <View style={styles.tableFooter}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>${fmt(proposal.total)}</Text>
          </View>
        </View>

        {/* Payment Terms */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionLabel}>Payment Terms</Text>
          <Text style={styles.bodyText}>{proposal.paymentTerms}</Text>
        </View>

        {/* CTA */}
        <View style={styles.cta}>
          <Text style={styles.ctaText}>{proposal.callToAction}</Text>
        </View>

        {/* Signatures */}
        <View style={styles.signatureGrid}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Authorized By</Text>
            <View style={styles.signatureLine}>
              <Text style={styles.signatureName}>{contractorName}</Text>
              <Text style={styles.signatureSub}>{businessName}</Text>
            </View>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Accepted By</Text>
            <View style={styles.signatureLine}>
              <Text style={styles.signatureName}>{clientName}</Text>
              <Text style={styles.signatureSub}>Date: ___________</Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
}