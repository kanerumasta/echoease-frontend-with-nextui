'use client'

import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { RatingPicker } from "../../../[slug]/components/rating-picker"
import { useState } from "react"
import { Textarea } from "@nextui-org/input"
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice"
import { usePostAReviewMutation } from "@/redux/features/reviewsApiSlice"
import { toast } from "react-toastify"

export const PostReview = ({bookingId}:{bookingId:number}) => {
    const {data:currentUser}  = useFetchCurrentUserQuery()
    const [rating, setRating] = useState(5)
    const [feedback, setFeedback] = useState("")
    const [postAReview,{isLoading}] = usePostAReviewMutation()
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
    const handleSubmitReview =async () => {
        if(!currentUser?.id ||!bookingId) return
        const payload = {
            "rating": rating,
            "feedback": feedback,
            "booking": bookingId,
            "client":currentUser.id
        }

        console.log(payload)
        await postAReview(payload)
        toast.success("Thank you for your feedback Echoer.")
        setRating(5)
        setFeedback("")
        onClose()

    }
    const handleRatingChange = (newRating:number) => {
        setRating(newRating)
    }
    return <>
        <Button onPress={onOpen} radius="sm" color="warning">Post A Review</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    <div>
                        <p className="text-xl">Rate Your Experience</p>
                        <p className="text-sm font-normal text-white/50">Share your feedback and review for this booking to help others and support the artist!</p>
                    </div>

                </ModalHeader>
                <ModalBody>
                    <div className="space-y-3">
                        <RatingPicker initialRating={5} onRatingChange={handleRatingChange} />

                        <Textarea onChange={(e)=>setFeedback(e.target.value)} label="We are happy to hear your feedbacks." placeholder="Type your feedback here..." radius="sm"/>

                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button radius="sm" onPress={onClose}>Cancel</Button>
                    <Button isLoading={isLoading} color="primary" radius="sm" onPress={handleSubmitReview}>Submit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}
