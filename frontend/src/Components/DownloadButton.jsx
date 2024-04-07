import React from "react";
import { Button } from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = ({ data = [] }) => (
  <Document>
    {data.length > 0 ? (
      <Page size="A4" style={styles.page}>
        {data.map(({ status, tasks }) => (
          <View key={status} style={styles.section}>
            <Text>{status.toUpperCase()}</Text>
            {tasks.map((task) => (
              <Text key={task.id}>
                {task.name} - {task.date}
              </Text>
            ))}
          </View>
        ))}
      </Page>
    ) : (
      <Page size="A4" style={styles.page}>
        <Text>No data available</Text>
      </Page>
    )}
  </Document>
);

const DownloadButton = ({ data }) => (
  <PDFDownloadLink document={<MyDocument data={data} />} fileName="tasks.pdf">
    {({ blob, url, loading, error }) => (
      <Button colorScheme="blue">
        {loading ? "Loading..." : "Download PDF"}
      </Button>
    )}
  </PDFDownloadLink>
);

export default { DownloadButton, MyDocument };
