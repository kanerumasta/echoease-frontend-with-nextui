"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useState } from "react";
import { Textarea } from "@nextui-org/input";
import { toast } from "react-toastify";

import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { usePostAReviewMutation } from "@/redux/features/reviewsApiSlice";

import { RatingPicker } from "../../../[slug]/components/rating-picker";

export const PostReview = ({ bookingId }: { bookingId: number }) => {
  const { data: currentUser } = useFetchCurrentUserQuery();
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [postAReview, { isLoading }] = usePostAReviewMutation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const handleSubmitReview = async () => {
    if (!currentUser?.id || !bookingId) return;
    const payload = {
      rating: rating,
      feedback: feedback,
      booking: bookingId,
      client_id: currentUser.id,
    };


    await postAReview(payload);
    toast.success("Thank you for your feedback Echoer.");
    setRating(5);
    setFeedback("");
    onClose();
  };
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <>
      <Button color="warning" radius="sm" onPress={onOpen}>
        Post A Review
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <div>
              <p className="text-xl">Rate Your Experience</p>
              <p className="text-sm font-normal text-white/50">
                Share your feedback and review for this booking to help others
                and support the artist!
              </p>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-3">
              <RatingPicker
                initialRating={5}
                onRatingChange={handleRatingChange}
              />

              <Textarea
                label="We are happy to hear your feedbacks."
                placeholder="Type your feedback here..."
                radius="sm"
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button radius="sm" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              isLoading={isLoading}
              radius="sm"
              onPress={handleSubmitReview}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
