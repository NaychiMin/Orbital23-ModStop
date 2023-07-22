const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recSchedSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    sem1: {
        type: Array,
        required: true
    },
    sem2: {
        type: Array,
        required: true
    },
    sem3: {
        type: Array,
        required: true
    },
    sem4: {
        type: Array,
        required: true
    },
    sem5: {
        type: Array,
        required: true
    },
    sem6: {
        type: Array,
        required: true
    },
    sem7: {
        type: Array
    },
    sem8: {
        type: Array
    }
})

recSchedSchema.statics.addDefault = async function(email, course, track) {

    let sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8;
    console.log(email)
    //validation
    if (course == "Computer Engineering"){
        if(track == "Polytechnic"){
            sem1 = ["CG1111", "CS1010", "MA1301", "PC1201", "GEC1xxx"]
            sem2 = ["CG2111A", 'CS2040C', 'EE2026', 'GEA1000', 'MA1508E']
            sem3 = ['CG2027', 'CG2028', 'CS2113', 'IE2141', 'ES2631', 'MA1511', 'MA1512']
            sem4 = ['CG2023', 'CG2271', 'PF1101', 'EE2211', 'EG2501']
            sem5 = ['CG4002', 'CS1231', 'GESS1xxx', 'EG2401A']
            sem6 = ['CDE2000', 'GEN1xxx', 'EE4204']
            sem7 = []
            sem8 = []
        } else {
            sem1 = ["CG1111", "CS1010", "EG1311", "MA1511", "MA1512"]
            sem2 = ["CG2111A", 'DTK1234', 'MA1508E', 'PF1101', 'GEA1000']
            sem3 = ['CS1231', 'CS2040C', 'GEC1xxx', 'IE2141', 'ES2631']
            sem4 = ['CG2023', 'CS2113', 'EE2026', 'EE2211', 'EG2501']
            sem5 = ['CP3880', 'EG2401A']
            sem6 = ['CG2027', 'CG2028', 'CG2271', 'CDE2000', 'GESS1xxx']
            sem7 = ['CG4002', 'EE4204', 'GEN1xxx']
            sem8 = []
        }
        
    } else {
        console.log('ee coming soon')
    }
    const record = await this.create({email, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8})
    return record
}

recSchedSchema.statics.updateRecScheds = async function (email, draggableText, draggedBox, droppedBox) {
    // Fetch the existing record using the email
    const record = await this.findOne({ email });
    console.log(record)
  
    // Ensure the record exists
    if (!record) {
      throw new Error("Record not found");
    }
  
    // Function to update the sem arrays
    const updateSem = (box, text) => {
      // Find the index of the text in the source sem array
      const sourceSem = record[box];
      const sourceIndex = sourceSem.indexOf(text);
  
      // If the text is found in the source sem array, remove it
      if (sourceIndex !== -1) {
        sourceSem.splice(sourceIndex, 1);
  
        // Update the state with the modified array
        record[box] = sourceSem;
      }
  
      // Push the text to the destination sem array
      record[droppedBox].push(text);
    };
  
    // Update the sem arrays based on draggedBox and droppedBox values
    if (draggedBox && droppedBox && draggableText) {
      updateSem(draggedBox, draggableText);
      console.log('helloi')
    }
  
    // Save the updated record to the database
    await record.save();
  
    return record;
  };


  recSchedSchema.statics.updateRecSchedsExtra = async function (email, dragMods, droppedBox) {
    // Fetch the existing record using the email
    const record = await this.findOne({ email });
    const allSemesters = [
        record.sem1, record.sem2, record.sem3, record.sem4,
        record.sem5, record.sem6, record.sem7, record.sem8
      ].flat();
      console.log(allSemesters)
      const result = dragMods.forEach((item) => {
        if (allSemesters.includes(item)) {
            const sourceIndex = dragMods.indexOf(item);
            dragMods.splice(sourceIndex, 1);
        }
        
      });
      record[droppedBox] = record[droppedBox].concat(dragMods)
        console.log('final dragmods:', dragMods)
        console.log('record', record[droppedBox])

     await record.save();
  
    return record;
  };
module.exports = mongoose.model('recSched', recSchedSchema)