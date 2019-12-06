/**
 * @swagger
 *
 * components:
 *  schemas:
 *      ShortResponse:
 *          type: object
 *          properties:
 *              address:
 *                  type: string
 *                  example: "http://localhost:4000/ax3RG4"
 *              short_url:
 *                  type: string
 *                  example: "ax3RG4"
 *              target:
 *                  type: string
 *                  example: "https://CourseProject.co"
 *      FullResponse:
 *          type: object
 *          properties:
 *              address:
 *                  type: string
 *                  example: "http://localhost:4000/ax3RG4"
 *              short_url:
 *                  type: string
 *                  example: "ax3RG4"
 *              target:
 *                  type: string
 *                  example: "https://CourseProject.co"
 *              description:
 *                  type: string
 *                  example: "CourseProject.co is the best lending as a service platform."
 *              expire_in:
 *                  type: string
 *                  example: "2020-01-01T00:00:00.000Z"
 *              visit_count:
 *                  type: number
 *                  example: 0
 *              created_at:
 *                  type: string
 *                  example: 0
 *              referrers:
 *                  type: number
 *                  example: 0
 *              total_visit_count:
 *                  type: number
 *                  example: 0
 *              visit_count_chrome:
 *                  type: number
 *                  example: 0
 *              visit_count_edge:
 *                  type: number
 *                  example: 0
 *              visit_count_firefox:
 *                  type: number
 *                  example: 0
 *              visit_count_ie:
 *                  type: number
 *                  example: 0
 *              visit_count_opera:
 *                  type: number
 *                  example: 0
 *              visit_count_other:
 *                  type: number
 *                  example: 0
 *              visit_count_safari:
 *                  type: number
 *                  example: 0
 *              os_android:
 *                  type: number
 *                  example: 0
 *              os_ios:
 *                  type: number
 *                  example: 0
 *              os_linux:
 *                  type: number
 *                  example: 0
 *              os_macos:
 *                  type: number
 *                  example: 0
 *              os_other:
 *                  type: number
 *                  example: 0
 *              os_windows:
 *                  type: number
 *                  example: 0
 *      BadRequestError:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: number
 *                  example: 400
 *              message:
 *                  type: string
 *                  example: "Invalid URL"
 *      NotFoundError:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: number
 *                  example: 404
 *              message:
 *                  type: string
 *                  example: "URL Not Found"
 *      ServerError:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
 *                  example: error
 *              message:
 *                  type: string
 *                  description: Server error description
 *                  example: Internal server error
 *      EntityError:
 *          type: object
 *          properties:
 *              msg:
 *                  type: string
 *                  example: "URL is required"
 *              param:
 *                  type: string
 *                  example: "url"
 *              location:
 *                  type: string
 *                  example: "body"
 *      UnprocessableEntityError:
 *          type: object
 *          properties:
 *              errors:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/EntityError'
 *      InternalServerError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  example: "Internal Server Error"
 *
 */
