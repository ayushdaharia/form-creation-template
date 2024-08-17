import html2pdf from "html2pdf.js";
import React, { useEffect, useState } from "react";
import { getData } from "../assets/services/GetApiCall";
import { useSnackbar } from "notistack";
import { uploadFile } from "../assets/services/PostApiCall";
import { updateData } from "../assets/services/PatchApi";
import { sortDataByName } from "../assets/utils";
import UnocareLogo from "../assets/images/logounocare.png";
import TajLogo from "../assets/images/taj.png";
import dayjs from "dayjs";

const empIDArray = [
  "R1200",
  "AE09",
  "AE23",
  "110059",
  "LJE31",
  "110536",
  "110496",
  "110525",
  "ST126",
  "347960",
  "113010",
  "145364",
  "SMC-057",
  "Y680",
  "JE14",
  "SMC167",
  "113888",
  "SMC169",
  "SMC-142",
  "SMC-160",
  "SMC102",
  "113887",
  "Y854",
  "Y380",
  "121504",
  "110026",
  "SMC-153",
  "ST1743",
  "R1263",
  "ST1729",
  "R1261",
  "Y159",
  "127000",
  "AKK-010",
  "R0493",
  "Y177",
  "110263",
  "R1197",
  "R1196",
  "Y866",
  "R1223",
  "R1132",
  "R1273",
  "SMC-179",
  "AE56",
  "R1213",
  "R1262",
  "SMC154",
  "Y797",
  "SMC-058",
  "Y840",
  "ST1801",
  "113861",
  "AE44",
  "R1066",
  "1009",
  "SMC-052",
  "110527",
  "AE08",
  "AE41",
  "AE29",
  "110489",
  "110022",
  "R1245",
  "R1301",
  "113833",
  "SMC-113",
  "1300",
  "ST1840",
  "R1210",
  "JE318",
  "JE223",
  "72",
  "AE75",
  "124570",
  "118309",
  "110540",
  "AE10",
  "AE15",
  "Y111",
  "AE87",
  "113875",
  "AE13",
  "Y892",
  "AE86",
  "Y117",
  "Y862",
  "Y898",
  "ST1774",
  "110512",
  "ST1644",
  "AE12",
  "110509",
  "59",
  "AE16",
  "R0475",
  "61",
  "Y168",
  "64",
  "1023",
  "AKK-001",
  "110499",
  "110307",
  "110350",
  "R1247",
  "JE28",
  "110004",
  "114810",
  "110280",
  "110513",
  "110294",
  "R1244",
  "R0765",
  "126970",
  "110395",
  "JE222",
  "110282",
  "354723",
  "110216",
  "110514",
  "113907",
  "110519",
  "145670",
  "113867",
  "R1198",
  "416300",
  "113900",
  "113899",
  "121499",
  "110003",
  "110452",
  "AE11",
  "AE14",
  "R1280",
  "Y706",
  "110526",
  "113904",
  "110473",
  "110521",
  "JE287",
  "R959",
  "JE54",
  "110141",
  "418164",
  "113844",
  "113866",
  "113903",
  "418134",
  "113868",
  "AE40",
  "122732",
  "73",
  "R0758",
  "113802",
  "110413",
  "348856",
  "JE02",
  "113911",
  "110447",
  "121500",
  "145669",
  "ST025",
  "113858",
  "122731",
  "AE06",
  "SMC-070",
  "SMC-004",
  "SMC-002",
  "113845",
  "110086",
  "R1195",
  "R1288",
  "113877",
  "113841",
  "110548",
  "R1260",
  "110549",
  "125677",
  "33",
  "113880",
  "125282",
  "R1249",
  "ST1402",
  "77",
  "113906",
  "ST1834",
  "113822",
  "110113",
  "110545",
  "AE63",
  "AE90",
  "347504",
  "Y881",
  "113910",
  "418133",
  "418132",
  "110272",
  "110535",
  "SMC-021",
  "240581",
  "JE208",
  "JE427",
  "Y471",
  "419338",
  "AE05",
  "1206",
  "R0762",
  "R0801",
  "R0800",
  "110176",
  "ST740",
  "113912",
  "Y367",
  "ST1074",
  "354722",
  "R1207",
  "ST608",
  "1198",
  "R1218",
  "AKK-011",
  "JE125",
  "AE52",
  "ST694",
  "ST1781",
  "JE113",
  "AE50",
  "Y811",
  "R1205",
  "AE25",
  "113838",
  "113846",
  "81",
  "235916",
  "110101",
  "JE194",
  "110538",
  "110477",
  "418100",
  "417873",
  "110051",
  "110467",
  "SMC-022",
  "AKK-003",
  "SMC-158",
  "119",
  "799",
  "1312",
  "1279",
  "JE233",
  "R0973",
  "ST1835",
  "1306",
  "R1289",
  "122733",
  "R1248",
  "R1226",
  "113828",
  "R1300",
  "110215",
  "113836",
  "R1291",
  "R1299",
  "R1254",
  "R1287",
  "H102",
  "ST1630",
  "ST1436",
  "R1265",
  "110009",
  "1209",
  "R1278",
  "R1302",
  "R1181",
  "ST1636",
  "113827",
  "416812",
  "ST685",
  "113883",
  "R1297",
  "R1292",
  "ST1474",
  "Y220",
  "1278",
  "110267",
  "110470",
  "R1105",
  "AE91",
  "Y896",
  "113918",
  "418135",
  "R1268",
  "JE193",
  "ST1673",
  "AE47",
  "ST1408",
  "113797",
  "113856",
  "Y110",
  "113902",
  "AE66",
  "ST1509",
  "113917",
  "113832",
  "Y902",
  "110497",
  "JE192",
  "110534",
  "Y889",
  "Y169",
  "353470",
  "ST1812",
  "JE428",
  "110498",
  "110243",
  "ST1772",
  "110443",
  "Y192",
  "AE92",
  "347019",
  "113805",
  "113882",
  "122734",
  "113821",
  "AE42",
  "Y914",
];

const Hershey = ({
  corpId = "85193c4a-54bc-4780-bdc8-0679e0847775",
  // corpId = "872cd841-9f7a-432d-b8e9-422b780bca10",
  fileType = "ANNEXURE",
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const batchSize = 50;
  const [list, setList] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const generatePDF = async (data) => {
    const content = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Medical Fitness Certificate</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 20px;
      }
      .container {
        width: 80%;
        margin: auto;
      }
      .header {
        text-align: center;
        margin-top: 30px;
      }
      .header h5 {
        margin-bottom: 5px; /* Adjust this value to reduce spacing */
      }
      .header p {
        margin-top: 5px; /* Adjust this value to reduce spacing */
        margin-bottom: 0; /* Optionally remove the bottom margin if needed */
      }
      .content {
        margin-top: 40px;
      }
      .footer {
        margin-top: 50px;
      }
      .section-title {
        font-weight: bold;
        text-align: center;
        margin-block: 0;
      }
      .signature {
        margin-top: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .signature2 {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .list {
        list-style-type: none;
        padding-left: 0;
      }
      .list li {
        margin-bottom: 3px; /* Reduces space between list items */
        font-size: 14px;
        line-height: 1.2; /* Adjusts the spacing within each list item */
      }
      .note {
        margin-top: 30px;
      }
      .form-counterfoil {
        margin-top: 50px;
      } 
      
    </style>
  </head>
  <body>
    <div class="container">
      <div style="min-height:1100px">
        <div class="header">
          <h5>PERFORMA FOR MEDICAL FITNESS CERTIFICATE FOR FOOD HANDLERS</h5>
          <p style="font-size: 14px">
            (See Para No. 10.1.2, Part- II, Schedule - 4 of FSS Regulation,
            2011)
          </p>
          <p style="font-size: 14px; text-align: right; margin-top: 30px">
            (FOR THE YEAR : 2024)
          </p>
        </div>

        <div class="content">
          <p style="font-size: 14px">
            It is certified that Shri/Smt./Miss
            <span style="text-decoration: underline; text-transform: capitalize;">${data.name?.toLowerCase()}</span>
            employed with M/s.
            <strong>HERSHEY INDIA PRIVATE LIMITED, MANDIDEEP</strong>, coming in
            direct contact with food items has been carefully examined * by me
            on date
           <span style="text-decoration: underline">
  ${
    data?.cholestrolData?.SAMPLE_REPORTED_DATE
      ? dayjs(
          data?.cholestrolData?.SAMPLE_REPORTED_DATE?.split(" ")[0],
          "DD-MMM-YYYY"
        ).format("DD/MM/YYYY")
      : dayjs(data?.vitalsCreatedDate).add(2, "day").format("DD/MM/YYYY") || ""
  }
</span>
            . Based on the medical examination conducted, he/she is found free
            from any infectious or communicable diseases and the person is fit
            to work in the above-mentioned food establishment.
          </p>

          <div class="signature" style="font-size: 14px">
            <div style="width: 45%">
              <img
                style="width: 260px; height: 100px; object-fit: contain"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABgAAAANgAQAAAADCWZ47AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAB3YoTpAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+gIEQYhMEDdEYkAAALNelRYdFJhdyBwcm9maWxlIHR5cGUgeG1wAABIx61WW5KcMAz81ylyBFuyJXMcBsxfqvKZ46dlYAy7XiqbykwtO6BXq/Uw9PvnL/qBT4yxkCyyWbGgUUVfmi1xUNasppNWWdnq9nq9NjY8nzT5k2yS0yohrRaSQLfoRKnYbDDMYnOqOSn+w6EIjNhkkxpmWazIbEVhqKsH08jB73XRauIy8ghAk3RzHDLvgrc6kByuGDoqc+aUkn5wAxlB6K6KJXyDzDDdrH24GrS46gZF402iTP7FryCMK+O67gF4JRMDFx7dCq8eAfKGIswcOhLAADVInHWyAP0JOVQgO+SEtBgxkYgjY3PzO/AUG1o4UP6MvoWuGqkrubMjTkUFN12hBvagiLS4SjgZ81Cy3ALMlJrqKb4mk1FYi11ylQHt1NPy5iFkA4OcDJmjat4l3NjwdBnIckdxurtjSc5bBkdIKKPRKlhGNSQxWk1APKpksvA2MutWZwgaxsjo9ZSm5t5Lji5AwRTXjMqCDDFF6QW1RmoeGg0ZJUADDdiUYaLoF/xApSHLA0yXMD1lGuBBfx1o3PkeIANXlNTSnXBXkP4tBN1Nn0jFHKIAyLC8S+O8Hu7oWfFaet6uxb82jEto1DMDXi7ddnXZB4euk/P9CesDRl9NGBRlsBdCa9Ol7wTXwxUNuaCxUHzfAO+pivepak5nx4O/5cpdx+6ztlh6nKiGs91FrWqOs60c721Fj2f3QB45NzxnPPWtvXMzYXODEV7hPj7Xjd603pC5aJzQuGZoyP9TM1lpXDMLTfXLfXgeFn0F0m5yVEvu1Trc+bL17Vm85FJxN/nRpoVD8vkvINwbUncah0ZPrNxJoX9n5U4K9bPSz9HvsGKeUjgPBvrAyu7uulCRlu8FfBfwI96UpgcdF20aqf89M12LztP8/fjT68IuGbyzYB72txNjNvL3DfoDiVIRvXrEWF8AAAABb3JOVAHPoneaAAAEwUlEQVR42u3PMQ0AMAzAsPInvYLYYVVKEDjzjjca0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1owG8LgfOdzN/g0r4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDgtMTdUMDY6MzM6NDUrMDA6MDAngfjDAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTA4LTE3VDA2OjMzOjQ1KzAwOjAwVtxAfwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNC0wOC0xN1QwNjozMzo0OCswMDowMGAeAGAAAAAYdEVYdHBkZjpBdXRob3IAQXl1c2ggRGFoYXJpYfgc3PEAAAAVdEVYdHhtcDpDcmVhdG9yVG9vbABDYW52YerHErEAAAAASUVORK5CYII="
              />
            </div>
            <div style="width: 45%">
              <img
                style="
                  width: 260px;
                  height: 100px;
                  object-fit: contain;
                  margin-left: -70px;
                "
              />
              <p style="font-size: 14px; margin-top: -20px; line-height: 1.2">
                <span style="font-weight: bold"
                  >Name and Signature with Seal</span
                >
                of Registered Medical Practitioner / Civil Surgeon
              </p>
            </div>
          </div>

          <h4>Medical Examination to be conducted:</h4>
          <ul style="margin-block: 0px" class="list">
            <li>1. Physical Examination</li>
            <li>2. Eye Test</li>
            <li>3. Skin Examination</li>
            <li>
              4. Any test required to confirm any communicable or infectious
              disease which the person is suspected to be suffering from on
              clinical examination.
            </li>
          </ul>
        </div>
      </div>

       

      <div class="content form-counterfoil"  style="min-height:1100px">
        <h3
          class="section-title"
          style="font-size: 16px; text-decoration: underline"
        >
          Certificate of Fitness
        </h3>
        <p class="section-title" style="font-size: 14px">(Form 32)</p>

        <p style="text-align: right">
          Date
          <span style="text-decoration: underline">
  ${
    dayjs(
      data?.cholestrolData?.SAMPLE_REPORTED_DATE?.split(" ")[0],
      "DD-MMM-YYYY"
    ).format("DD/MM/YYYY") ||
    dayjs(data?.vitalsCreatedDate).add(2, "day").format("DD/MM/YYYY")
  }
</span>
        </p>
        <p>
          Serial Number
          <span style="text-decoration: underline">${data.empId || ""}</span>
        </p>

        <p>
          1. I certify that I have personally examined Mr./ Mrs.
          <span style="text-decoration: underline; text-transform: capitalize;">${
            data.name?.toLowerCase() || ""
          }</span>
          s/o Mr.
          <span style="text-decoration: underline; text-transform: capitalize;">${data.fathersName?.toLowerCase()}</span>
          employed at
        
          <strong
            >Hershey India Private Limited, Plot No. 5, New Industrial Area No.
            1, Mandideep, Distt. - Raisen</strong
          >
          in (Department and process)
          <span style="text-decoration: underline"; text-transform: capitalize;
            >${data?.department?.toLowerCase() || ""}</span
          >
          and that as nearly as can be ascertained from my examination, is FIT
          for employment at the above noted factory.
        </p>

        <p>
          2. He is fit to be employed and may be employed onsite other
          non-hazardous operations.
        </p>
        <p>
          3. He may be produced for further examination after a period of
          <span style="text-decoration: underline"> 1 Year.</span>
        </p>
        <p>
          4. He is advised following further examination
          <span style="text-decoration: underline">_______________</span>
        </p>
        <p>
          5. He is advised following treatment
          <span style="text-decoration: underline">_______________</span>
        </p>
        <p>
          6. The serial number of the previous certificate is
          <span style="text-decoration: underline">_______________</span>
        </p>

        <div class="signature2">
          <div style="width: 45%">
            <img
              style="width: 260px; height: 100px; object-fit: contain"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABgAAAANgAQAAAADCWZ47AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAB3YoTpAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+gIEQYhMEDdEYkAAALNelRYdFJhdyBwcm9maWxlIHR5cGUgeG1wAABIx61WW5KcMAz81ylyBFuyJXMcBsxfqvKZ46dlYAy7XiqbykwtO6BXq/Uw9PvnL/qBT4yxkCyyWbGgUUVfmi1xUNasppNWWdnq9nq9NjY8nzT5k2yS0yohrRaSQLfoRKnYbDDMYnOqOSn+w6EIjNhkkxpmWazIbEVhqKsH08jB73XRauIy8ghAk3RzHDLvgrc6kByuGDoqc+aUkn5wAxlB6K6KJXyDzDDdrH24GrS46gZF402iTP7FryCMK+O67gF4JRMDFx7dCq8eAfKGIswcOhLAADVInHWyAP0JOVQgO+SEtBgxkYgjY3PzO/AUG1o4UP6MvoWuGqkrubMjTkUFN12hBvagiLS4SjgZ81Cy3ALMlJrqKb4mk1FYi11ylQHt1NPy5iFkA4OcDJmjat4l3NjwdBnIckdxurtjSc5bBkdIKKPRKlhGNSQxWk1APKpksvA2MutWZwgaxsjo9ZSm5t5Lji5AwRTXjMqCDDFF6QW1RmoeGg0ZJUADDdiUYaLoF/xApSHLA0yXMD1lGuBBfx1o3PkeIANXlNTSnXBXkP4tBN1Nn0jFHKIAyLC8S+O8Hu7oWfFaet6uxb82jEto1DMDXi7ddnXZB4euk/P9CesDRl9NGBRlsBdCa9Ol7wTXwxUNuaCxUHzfAO+pivepak5nx4O/5cpdx+6ztlh6nKiGs91FrWqOs60c721Fj2f3QB45NzxnPPWtvXMzYXODEV7hPj7Xjd603pC5aJzQuGZoyP9TM1lpXDMLTfXLfXgeFn0F0m5yVEvu1Trc+bL17Vm85FJxN/nRpoVD8vkvINwbUncah0ZPrNxJoX9n5U4K9bPSz9HvsGKeUjgPBvrAyu7uulCRlu8FfBfwI96UpgcdF20aqf89M12LztP8/fjT68IuGbyzYB72txNjNvL3DfoDiVIRvXrEWF8AAAABb3JOVAHPoneaAAAEwUlEQVR42u3PMQ0AMAzAsPInvYLYYVVKEDjzjjca0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1owG8LgfOdzN/g0r4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDgtMTdUMDY6MzM6NDUrMDA6MDAngfjDAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTA4LTE3VDA2OjMzOjQ1KzAwOjAwVtxAfwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNC0wOC0xN1QwNjozMzo0OCswMDowMGAeAGAAAAAYdEVYdHBkZjpBdXRob3IAQXl1c2ggRGFoYXJpYfgc3PEAAAAVdEVYdHhtcDpDcmVhdG9yVG9vbABDYW52YerHErEAAAAASUVORK5CYII="
            />
            <p style="font-size: 14px; margin-top:0px; line-height: 1.2">
              Signature of L.T.I. of <br />
              Person examined
            </p>
          </div>
          <div style="width: 45%">
            <img
              style="
                width: 260px;
                height: 100px;
                object-fit: contain;
                margin-left: -70px;
              "
            />
            <p style="font-size: 14px; margin-top: 0px; line-height: 1.2">
              Signature of Certifying <br />
              Surgeon
            </p>
          </div>
        </div>

        <p class="note" style="font-size: 14px">
          Note:- The counterfoil should be retained by the Certifying <br />
          <span style="margin-right: 20px">(1)</span> Surgeon and maintained in
          a bound book or in a file.
          <br />
          <span style="margin-right: 20px">(2)</span>
          The para which does not apply may be canceled.
        </p>

        <p class="section-title">***********</p>
    </div>

 

      <div class="content form-counterfoil" style="min-height:1000px">
        <h5 class="section-title">FORM 32</h5>
        <p style="text-align: center; margin-block: 0; line-height: 1.2">
          Certificate of Fitness of Dangerous Operations <br />
          (Prescribed under Rule 107) <br />
          <strong style="margin-top: 5px"> Counterfoil </strong>
        </p>

        <p style="text-align: right">
          Date
          <span style="text-decoration: underline">
  ${
    dayjs(
      data?.cholestrolData?.SAMPLE_REPORTED_DATE?.split(" ")[0],
      "DD-MMM-YYYY"
    ).format("DD/MM/YYYY") ||
    dayjs(data?.vitalsCreatedDate).add(2, "day").format("DD/MM/YYYY")
  }
</span>
        </p>

        <ul class="list">
          <li>1. Serial Number  <span style="text-decoration: underline; text-transform: capitalize;">${
            data?.empId || ""
          }</span></li>
          <li>
            2. Name of person examined
            <span style="text-decoration: underline; text-transform: capitalize;">${data.name?.toLowerCase()}</span>
          </li>
          <li>
            3. Father's name
            <span style="text-decoration: underline;  text-transform: capitalize;">${data.fathersName?.toLowerCase()}</span>
          </li>
          <li>
            4. Age
            <span style="text-decoration: underline">${data.age} ${" "}</span>
            Sex
            <span style="text-decoration: underline; text-transform: capitalize;"> ${
              data.gender
            }</span>
          </li>

          <li>
            5. Name of the factory in which employed/wishes to be employed
            <strong
              style="text-decoration: underline; text-underline-offset: 2px"
              >Hershey India Private Limited, Plot No. 5, New Industrial Area
              No. 1, Mandideep, Distt. - Raisen - 462046</strong
            >
          </li>
          <li>
            6. Process of department in which employed/wishes to be employed
            <span style="text-decoration: underline; text-underline-offset: 2px"
              >_______________</span
            >
          </li>
          <li>7. Whether certificate granted _______________</li>
          <li>
            8. Whether declared unfit and certificate refused
            <span style="text-decoration: underline; text-underline-offset: 2px"
              >NA</span
            >
          </li>
          <li>9. Process of Department _______________</li>
          <li>
            10. Reference number of previous certificate granted or refused
            <span style="text-decoration: underline; text-underline-offset: 2px"
              >NA</span
            >
          </li>
        </ul>

        <div class="signature2">
          <div style="width: 45%">
            <img
              style="width: 260px; height: 100px; object-fit: contain"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABgAAAANgAQAAAADCWZ47AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAB3YoTpAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+gIEQYhMEDdEYkAAALNelRYdFJhdyBwcm9maWxlIHR5cGUgeG1wAABIx61WW5KcMAz81ylyBFuyJXMcBsxfqvKZ46dlYAy7XiqbykwtO6BXq/Uw9PvnL/qBT4yxkCyyWbGgUUVfmi1xUNasppNWWdnq9nq9NjY8nzT5k2yS0yohrRaSQLfoRKnYbDDMYnOqOSn+w6EIjNhkkxpmWazIbEVhqKsH08jB73XRauIy8ghAk3RzHDLvgrc6kByuGDoqc+aUkn5wAxlB6K6KJXyDzDDdrH24GrS46gZF402iTP7FryCMK+O67gF4JRMDFx7dCq8eAfKGIswcOhLAADVInHWyAP0JOVQgO+SEtBgxkYgjY3PzO/AUG1o4UP6MvoWuGqkrubMjTkUFN12hBvagiLS4SjgZ81Cy3ALMlJrqKb4mk1FYi11ylQHt1NPy5iFkA4OcDJmjat4l3NjwdBnIckdxurtjSc5bBkdIKKPRKlhGNSQxWk1APKpksvA2MutWZwgaxsjo9ZSm5t5Lji5AwRTXjMqCDDFF6QW1RmoeGg0ZJUADDdiUYaLoF/xApSHLA0yXMD1lGuBBfx1o3PkeIANXlNTSnXBXkP4tBN1Nn0jFHKIAyLC8S+O8Hu7oWfFaet6uxb82jEto1DMDXi7ddnXZB4euk/P9CesDRl9NGBRlsBdCa9Ol7wTXwxUNuaCxUHzfAO+pivepak5nx4O/5cpdx+6ztlh6nKiGs91FrWqOs60c721Fj2f3QB45NzxnPPWtvXMzYXODEV7hPj7Xjd603pC5aJzQuGZoyP9TM1lpXDMLTfXLfXgeFn0F0m5yVEvu1Trc+bL17Vm85FJxN/nRpoVD8vkvINwbUncah0ZPrNxJoX9n5U4K9bPSz9HvsGKeUjgPBvrAyu7uulCRlu8FfBfwI96UpgcdF20aqf89M12LztP8/fjT68IuGbyzYB72txNjNvL3DfoDiVIRvXrEWF8AAAABb3JOVAHPoneaAAAEwUlEQVR42u3PMQ0AMAzAsPInvYLYYVVKEDjzjjca0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABjSgAQ1owG8LgfOdzN/g0r4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDgtMTdUMDY6MzM6NDUrMDA6MDAngfjDAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTA4LTE3VDA2OjMzOjQ1KzAwOjAwVtxAfwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNC0wOC0xN1QwNjozMzo0OCswMDowMGAeAGAAAAAYdEVYdHBkZjpBdXRob3IAQXl1c2ggRGFoYXJpYfgc3PEAAAAVdEVYdHhtcDpDcmVhdG9yVG9vbABDYW52YerHErEAAAAASUVORK5CYII="
            />
            <p style="font-size: 14px; margin-top: 0px; line-height: 1.2">
              Signature of L.T.I. of <br />Person examined
            </p>
          </div>
          <div style="width: 45%">
            <img
              style="
                width: 260px;
                height: 100px;
                object-fit: contain;
                margin-left: -70px;
              "
            />
            <p style="font-size: 14px; margin-top: 0px; line-height: 1.2">
              Signature of Certifying <br />Surgeon
            </p>
          </div>
        </div>

        <p class="section-title">***********</p>
      </div>
    </div>
  </body>
</html>

    `;

    const pdfBlob = await html2pdf()
      .from(content)
      .output("blob")
      .then((data) => {
        return data;
      });

    const formData = new FormData();
    formData.append("file", pdfBlob, `${data.empId}_annexure.pdf`);

    const url = `https://apibackend.uno.care/api/org/upload?empId=${data?.empId}&fileType=${fileType}&corpId=${corpId}&campCycleId=`;
    const result = await uploadFile(url, formData);
    if (result && result.data) {
      enqueueSnackbar("Successfully Uploaded PDF!", {
        variant: "success",
      });
      setUploadedCount((prevCount) => prevCount + 1);
      // const url = URL.createObjectURL(pdfBlob);
      // window.open(url, "_blank");
    } else {
      enqueueSnackbar("An error Occurred!", {
        variant: "error",
      });
    }
  };

  const fetchListOfEmployees = async () => {
    const url = `https://apibackend.uno.care/api/org/detailed/all?corpId=${corpId}&campCycleId=`;
    const result = await getData(url);
    if (result && result.data) {
      console.log("Fetched Data successfully");
      const temp = result.data;
      // .filter((item) =>
      //   empIDArray.includes(item.empId)
      // );
      const length = temp.length;
      console.log({ length });
      setList(sortDataByName(temp));
      setTotalEmployees(temp.length);
    } else {
      console.log("An error Occurred");
    }
  };

  useEffect(() => {
    fetchListOfEmployees();
  }, []);

  const handleGeneratePDFs = async () => {
    for (let i = 0; i < 200; i++) {
      await generatePDF(list[i]);
    }
  };
  const handleDeletePDF = async () => {
    for (let i = 0; i < list.length; i++) {
      await deleteFiles(list[i]);
    }
  };

  const deleteFiles = async (data) => {
    const url = `https://apibackend.uno.care/api/org/employee/delete/file?corpId=${corpId}&toDeletefiletype=${fileType}&empId=${data.empId}`;
    const result = await updateData(url);
    if (result && result.data) {
      enqueueSnackbar("Successfully Uploaded PDF!", {
        variant: "success",
      });
      setUploadedCount((prevCount) => prevCount + 1);
    } else {
      enqueueSnackbar("An error Occurred!", {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleGeneratePDFs}>Start Generating</button> <br />
        <button onClick={handleDeletePDF}>Delete Files</button>
        <div>Total Employees: {totalEmployees}</div> <br />
        <div>Uploaded Files: {uploadedCount}</div> <br />
        {list.map((item, index) => (
          <div key={index} style={{ display: "flex" }}>
            <div key={index}>{`${index}- ${item.empId} ${item.name}`}</div>
            <a href={item.annexureUrl}>
              <div key={index}>{item.annexureUrl}</div>
            </a>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hershey;