const { Types } = require("mongoose");
const BookingModel = require("../../Model/BookingSchema");
const NewBookingModel = require("../../Model/NewBookingSchema");
const SlotModel = require("../../Model/SlotSchema");
const PaymentModel = require("../../Model/PaymentHistoryModel");
const generateINVNumber = async () => {
  // Logic to generate reference number based on your requirements
  // You can use a combination of current month, year, and a sequential number
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
  const year = currentDate.getFullYear().toString().slice(2); // Take last two digits of the year

  // Get the latest payment record to determine the next sequential number
  const latestNewBooking = await NewBookingModel.find();
  const latestNumber = latestNewBooking ? latestNewBooking.length + 1 : 1;

  // Combine all components to form the reference number
  const referenceNumber = `INV-${month}-${year}-${latestNumber}`;

  return referenceNumber;
};
const Edit = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const findOldBooking = await BookingModel.findById(id)
    if (findOldBooking) {
      await BookingModel.deleteOne({ _id: id })

      // const results = await Promise.all(newData?.venue.map(async (element, index) => {
      //   // console.log(element);
      //   const currentDate = newData.selectedDate;

      //   const existingSlots = await SlotModel.find({
      //     date: currentDate,
      //     venue: element,
      //   });

      //   // Set the availability to "yes" for the old slot
      //   const oldSlotIndex = existingSlots.findIndex(
      //     (e) =>
      //       e.slots.findIndex(
      //         (slot) =>
      //           slot.slot === newData.selectedDate !== newData?.selectedSlot && slot.availability === "no"
      //       ) !== -1
      //   );

      //   if (oldSlotIndex !== -1) {
      //     existingSlots[oldSlotIndex].slots.forEach((slot) => {
      //       if (slot.slot === newData?.selectedSlot) {
      //         slot.availability = "yes";
      //       }
      //     });
      //   }

      //   // Set the availability to "no" for the new slot
      //   const newSlotIndex = existingSlots.findIndex(
      //     (e) =>
      //       e.slots.findIndex(
      //         (slot) =>
      //           slot.slot === newData.selectedSlot && slot.availability === "yes"
      //       ) !== -1
      //   );

      //   if (newSlotIndex !== -1) {
      //     existingSlots[newSlotIndex].slots.forEach((slot) => {
      //       if (slot.slot === newData.selectedSlot) {
      //         slot.availability = "no";
      //       }
      //     });
      //   }


      //   if (!newData.venue.includes(element)) {
      //     existingSlots.forEach((e) => {
      //       e.slots.forEach((slot) => {
      //         if (slot.slot === newData.selectedSlot) {
      //           slot.availability = "yes";
      //         }
      //       });
      //     });
      //   }
      //   await Promise.all(existingSlots.map((e) => e.save()));

      //   // return {
      //   //   message: "Booking updated successfully",
      //   //   updatedBooking: Booking,
      //   //   findOldBooking: findOldBooking
      //   // };
      // }));
      const results = await Promise.all(newData?.venue.map(async (element, index) => {
        const currentDate = findOldBooking.selectedDate;

        const existingSlots = await SlotModel.find({
          date: currentDate,
          venue: element,
        });
        const existingSlotsNew = await SlotModel.find({
          date: newData.selectedDate,
          venue: element,
        });

        // Handle previous selected slots
        findOldBooking.selectedSlot.forEach((prevSelectedSlot) => {
          const prevSlotIndex = existingSlots.findIndex(
            (e) => e.slots.some((slot) => slot.slot === prevSelectedSlot && slot.availability === "no")
          );

          if (prevSlotIndex !== -1) {
            existingSlots[prevSlotIndex].slots.forEach((slot) => {
              if (slot.slot === prevSelectedSlot) {
                slot.availability = "yes";
              }
              if (slot.slot === 'Full Day') {
                slot.availability = 'no';
              }
            });
          }

          const prevSlotIndexNew = existingSlotsNew.findIndex(
            (e) => e.slots.some((slot) => slot.slot === prevSelectedSlot && slot.availability === "no")
          );

          if (prevSlotIndexNew !== -1) {
            existingSlotsNew[prevSlotIndexNew].slots.forEach((slot) => {
              if (slot.slot === prevSelectedSlot) {
                slot.availability = "yes";
              }
              if (slot.slot === 'Full Day') {
                slot.availability = 'no';
              }
            });
          }
        });

        // Handle new selected slots
        newData.selectedSlot.forEach((newSelectedSlot) => {
          const newSlotIndex = existingSlotsNew.findIndex(
            (e) => e.slots.some((slot) => slot.slot === newSelectedSlot && slot.availability === "yes")
          );

          if (newSlotIndex !== -1) {
            existingSlotsNew[newSlotIndex].slots.forEach((slot) => {
              if (slot.slot === newSelectedSlot) {
                slot.availability = "no";
              }
              if (slot.slot === 'Full Day') {
                slot.availability = 'no';
              }
            });
          }

          const newSlotIndexExisting = existingSlots.findIndex(
            (e) => e.slots.some((slot) => slot.slot === newSelectedSlot && slot.availability === "yes")
          );

          if (newSlotIndexExisting !== -1) {
            existingSlots[newSlotIndexExisting].slots.forEach((slot) => {
              if (slot.slot === newSelectedSlot) {
                slot.availability = "no";
              }
              if (slot.slot === 'Full Day') {
                slot.availability = 'no';
              }
            });
          }
        });

        if (newData.Status === "Cancelled") {
          // Filter out slots that were already booked before
          const bookedSlots = booking?.selectedSlot || [];
          const slotsToUpdate = existingSlots
            .flatMap(e => e.slots)
            .filter(slot => bookedSlots.includes(slot.slot));

          // Set the availability to "yes" for the remaining slots
          slotsToUpdate.forEach(slot => {
            slot.availability = "yes";
          });

          // If it was a Full Day booking, set the availability of all slots to "yes"
          if (bookedSlots.includes("Full Day")) {
            existingSlots.forEach(e => {
              e.slots.forEach(slot => {
                slot.availability = "yes";
              });
            });
          }
        }

        await Promise.all(existingSlots.map((e) => e.save()));
        await Promise.all(existingSlotsNew.map((e) => e.save()));
      }));

      console.log(results)
      const sharedId = new Types.ObjectId();
      const invNumber = await generateINVNumber()
      const data = {
        inv: invNumber,
        _id: sharedId,
        firstName: newData.firstName,
        lastName: newData.lastName,
        email: newData.email,
        phone: newData.phone,
        zip: newData.zip,
        city: newData.city,
        state: newData.state,
        venue: newData.venue,
        selectedDate: newData.selectedDate,
        selectedSlot: newData.selectedSlot,
        eventType: newData.eventType,
        minPerson: newData.minPerson,
        maxPerson: newData.maxPerson,
        maxPerson: newData.maxPerson,
        Status: newData.Status,
        createAt: newData.createAt,
        updated: newData.updated,
        Services: newData.Services ? newData.Services : [],
        summary: newData.summary,
        venueCharges: newData.venueCharges,
        stage: newData.stage,
        capacity: newData.capacity,
        venueUnitPrice: newData.venueUnitPrice,
        custom: newData.custom ? newData.custom : [],
        inventory: newData.inventory,
        note: newData.note
      };
      const paymentHistory = {
        _id: sharedId,
        recived: 0,
        balance: newData.summary.total,
        total: newData.summary.total,
      }
      const hasErrors = results.some(result => result instanceof Error);
      if (!hasErrors) {
        const payment = await PaymentModel.create(paymentHistory);
        const Booking = await NewBookingModel.create(data);
        res.status(200).json({
          message: "Booking updated successfully",
          updatedBooking: Booking,
        });
      }
      // res.json({ results })

      return
    } else {
      const booking = await NewBookingModel.findById(id);
      const payment = await PaymentModel.findById(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      } else {

        const results = await Promise.all(booking?.venue.map(async (element, index) => {
          const currentDate = booking.selectedDate;

          const existingSlots = await SlotModel.find({
            date: currentDate,
            venue: element,
          });
          const existingSlotsNew = await SlotModel.find({
            date: newData.selectedDate,
            venue: element,
          });
          if (booking.selectedDate === newData.selectedDate) {
            booking.selectedSlot.forEach((prevSelectedSlot) => {
              const prevSlotIndex = existingSlots.findIndex(
                (e) => e.slots.some((slot) => slot.slot === prevSelectedSlot && slot.availability === "no")
              );

              if (prevSlotIndex !== -1) {
                existingSlots[prevSlotIndex].slots.forEach((slot) => {
                  if (slot.slot === prevSelectedSlot) {
                    slot.availability = "yes";
                  }
                  if (slot.slot === 'Full Day') {
                    slot.availability = 'no';
                  }
                });
              }

              const prevSlotIndexNew = existingSlotsNew.findIndex(
                (e) => e.slots.some((slot) => slot.slot === prevSelectedSlot && slot.availability === "no")
              );

              if (prevSlotIndexNew !== -1) {
                existingSlotsNew[prevSlotIndexNew].slots.forEach((slot) => {
                  if (slot.slot === prevSelectedSlot) {
                    slot.availability = "yes";
                  }
                  if (slot.slot === 'Full Day') {
                    slot.availability = 'no';
                  }
                });
              }
            });

            // Handle new selected slots
            newData.selectedSlot.forEach((newSelectedSlot) => {
              const newSlotIndex = existingSlotsNew.findIndex(
                (e) => e.slots.some((slot) => slot.slot === newSelectedSlot && slot.availability === "yes")
              );

              if (newSlotIndex !== -1) {
                existingSlotsNew[newSlotIndex].slots.forEach((slot) => {
                  if (slot.slot === newSelectedSlot) {
                    slot.availability = "no";
                  }
                  if (slot.slot === 'Full Day') {
                    slot.availability = 'no';
                  }
                });
              }

              const newSlotIndexExisting = existingSlots.findIndex(
                (e) => e.slots.some((slot) => slot.slot === newSelectedSlot && slot.availability === "yes")
              );

              if (newSlotIndexExisting !== -1) {
                existingSlots[newSlotIndexExisting].slots.forEach((slot) => {
                  if (slot.slot === newSelectedSlot) {
                    slot.availability = "no";
                  }
                  if (slot.slot === 'Full Day') {
                    slot.availability = 'no';
                  }
                });
              }
            });
          } else {
            booking.selectedSlot.forEach((prevSelectedSlot) => {
              const prevSlotIndex = existingSlots.findIndex(
                (e) => e.slots.some((slot) => slot.slot === prevSelectedSlot && slot.availability === "no")
              );

              if (prevSlotIndex !== -1) {
                existingSlots[prevSlotIndex].slots.forEach((slot) => {
                  if (slot.slot === prevSelectedSlot) {
                    slot.availability = "yes";
                  }
                  if (slot.slot === 'Full Day') {
                    slot.availability = 'no';
                  }
                });
              }

              // const prevSlotIndexNew = existingSlotsNew.findIndex(
              //   (e) => e.slots.some((slot) => slot.slot === prevSelectedSlot && slot.availability === "no")
              // );

              // if (prevSlotIndexNew !== -1) {
              //   existingSlotsNew[prevSlotIndexNew].slots.forEach((slot) => {
              //     if (slot.slot === prevSelectedSlot) {
              //       slot.availability = "yes";
              //     }

              //   });
              // }
            });

            // Handle new selected slots
            newData.selectedSlot.forEach((newSelectedSlot) => {
              const newSlotIndex = existingSlotsNew.findIndex(
                (e) => e.slots.some((slot) => slot.slot === newSelectedSlot && slot.availability === "yes")
              );

              if (newSlotIndex !== -1) {
                existingSlotsNew[newSlotIndex].slots.forEach((slot) => {
                  if (slot.slot === newSelectedSlot) {
                    slot.availability = "no";
                  }
                  if (slot.slot === 'Full Day') {
                    slot.availability = 'no';
                  }
                });
              }

              // const newSlotIndexExisting = existingSlots.findIndex(
              //   (e) => e.slots.some((slot) => slot.slot === newSelectedSlot && slot.availability === "yes")
              // );

              // if (newSlotIndexExisting !== -1) {
              //   existingSlots[newSlotIndexExisting].slots.forEach((slot) => {
              //     if (slot.slot === newSelectedSlot) {
              //       slot.availability = "no";
              //     }

              //   });
              // }
            });
          }
          // Handle previous selected slots


          if (newData.Status === "Cancelled") {
            // Filter out slots that were already booked before
            const bookedSlots = booking?.selectedSlot || [];
            const slotsToUpdate = existingSlots
              .flatMap(e => e.slots)
              .filter(slot => bookedSlots.includes(slot.slot));

            // Set the availability to "yes" for the remaining slots
            slotsToUpdate.forEach(slot => {
              slot.availability = "yes";
            });

            // If it was a Full Day booking, set the availability of all slots to "yes"
            if (bookedSlots.includes("Full Day")) {
              existingSlots.forEach(e => {
                e.slots.forEach(slot => {
                  slot.availability = "yes";
                });
              });
            }
          }

          await Promise.all(existingSlots.map((e) => e.save()));
          await Promise.all(existingSlotsNew.map((e) => e.save()));
        }));


        // const results = await Promise.all(booking?.venue.map(async (element, index) => {
        //   const currentDate = booking.selectedDate;

        //   const existingSlots = await SlotModel.find({
        //     date: currentDate,
        //     venue: element,
        //   });
        //   const existingSlotsNew = await SlotModel.find({
        //     date: newData.selectedDate,
        //     venue: element,
        //   });

        //   // Handle previous selected slots
        //   booking.selectedSlot.forEach((prevSelectedSlot) => {
        //     const prevSlotIndex = existingSlots.findIndex(
        //       (e) => e.slots.some((slot) => slot.slot === prevSelectedSlot && slot.availability === "no")
        //     );

        //     if (prevSlotIndex !== -1) {
        //       existingSlots[prevSlotIndex].slots.forEach((slot) => {
        //         if (slot.slot === prevSelectedSlot) {
        //           slot.availability = "yes";
        //         }
        //       });
        //     }
        //   });

        //   // Handle new selected slots
        //   newData.selectedSlot.forEach((newSelectedSlot) => {
        //     const newSlotIndex = existingSlotsNew.findIndex(
        //       (e) => e.slots.some((slot) => slot.slot === newSelectedSlot && slot.availability === "yes")
        //     );

        //     if (newSlotIndex !== -1) {
        //       existingSlotsNew[newSlotIndex].slots.forEach((slot) => {
        //         if (slot.slot === newSelectedSlot) {
        //           slot.availability = "no";
        //         }
        //       });
        //     }
        //   });

        //   if (newData.Status === "Cancelled") {
        //     // Filter out slots that were already booked before
        //     const bookedSlots = booking?.selectedSlot || [];
        //     const slotsToUpdate = existingSlots
        //       .flatMap(e => e.slots)
        //       .filter(slot => bookedSlots.includes(slot.slot));

        //     // Set the availability to "yes" for the remaining slots
        //     slotsToUpdate.forEach(slot => {
        //       slot.availability = "yes";
        //     });

        //     // If it was a Full Day booking, set the availability of all slots to "yes"
        //     if (bookedSlots.includes("Full Day")) {
        //       existingSlots.forEach(e => {
        //         e.slots.forEach(slot => {
        //           slot.availability = "yes";
        //         });
        //       });
        //     }
        //   }

        //   await Promise.all(existingSlots.map((e) => e.save()));
        //   await Promise.all(existingSlotsNew.map((e) => e.save()));
        // }));
        const hasErrors = results.some(result => result instanceof Error);
        if (!hasErrors) {
          const total = newData?.summary?.total
          const balance = total - payment.recived
          if (total) {
            await PaymentModel.findByIdAndUpdate(id, { balance: balance, total: total })
          }
          const updatedBooking = await NewBookingModel.findByIdAndUpdate(id, newData, {
            new: true,
          });
          res.status(200).json({
            message: "Booking updated successfully",
            updatedBooking,
          });
        }
        else {
          // Handle errors from Promise.all
          res.status(500).json({ message: "Error in processing slots" });
        }
      }
    }

  } catch (err) {
    res.status(500).json({ message: "Error updating Booking", error: err });
  }
};

module.exports = Edit;